import { useState, useRef } from "react";
import { Upload, Trash2, Image as ImageIcon, Loader2, Grid, List } from "lucide-react";
import { uploadToCloudinary, thumbnailUrl, trashCloudinaryAsset } from "../lib/cloudinary";
import { COLLECTIONS, getDocuments, createDocument, deleteDocument } from "../lib/contentManager";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function MediaPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState("grid");
  const inputRef = useRef(null);

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    setLoading(true);
    try {
      const docs = await getDocuments(COLLECTIONS.media);
      setItems(docs);
    } catch {
      toast.error("Failed to load media");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpload(files) {
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const result = await uploadToCloudinary(file, "media");
        await createDocument(COLLECTIONS.media, {
          url: result.secure_url,
          publicId: result.public_id,
          name: file.name,
          format: result.format,
          width: result.width,
          height: result.height,
          bytes: result.bytes,
          status: "published",
        });
      }
      toast.success(`${files.length} file(s) uploaded`);
      loadMedia();
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm("Move this media to trash? It will be deleted from Cloudinary after 30 days.")) return;
    try {
      await trashCloudinaryAsset(item.publicId);
      await deleteDocument(COLLECTIONS.media, item.id);
      setItems((prev) => prev.filter((i) => i.id !== item.id));
      toast.success("Moved to trash");
    } catch {
      toast.error("Delete failed");
    }
  }

  function copyUrl(url) {
    navigator.clipboard.writeText(url);
    toast.success("URL copied!");
  }

  return (
    <div className="admin-media">
      <div className="admin-page-header">
        <div>
          <h1>Media Library</h1>
          <p>{items.length} files · Powered by Cloudinary</p>
        </div>
        <div className="admin-media-toolbar">
          <div className="admin-view-toggle">
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
              <Grid size={16} />
            </button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
              <List size={16} />
            </button>
          </div>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
          >
            {uploading ? <Loader2 size={16} className="admin-spin" /> : <Upload size={16} />}
            Upload
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            hidden
            onChange={(e) => handleUpload(Array.from(e.target.files))}
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loader"><div className="admin-spinner" /></div>
      ) : items.length === 0 ? (
        <div className="admin-empty">
          <ImageIcon size={40} className="admin-empty-icon" />
          <p>No media uploaded yet</p>
          <button className="admin-btn admin-btn-secondary" onClick={() => inputRef.current?.click()}>
            Upload your first file
          </button>
        </div>
      ) : (
        <div className={`admin-media-${view}`}>
          {items.map((item) => (
            <div key={item.id} className="admin-media-card" onClick={() => copyUrl(item.url)}>
              <div className="admin-media-thumb">
                <img src={thumbnailUrl(item.publicId)} alt={item.name} loading="lazy" />
              </div>
              <div className="admin-media-info">
                <span className="admin-media-name">{item.name}</span>
                <span className="admin-media-meta">
                  {item.format?.toUpperCase()} · {Math.round((item.bytes || 0) / 1024)}KB
                </span>
              </div>
              <button
                className="admin-media-delete"
                onClick={(e) => { e.stopPropagation(); handleDelete(item); }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
