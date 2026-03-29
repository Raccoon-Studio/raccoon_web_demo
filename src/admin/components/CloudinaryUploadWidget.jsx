import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { uploadToCloudinary, thumbnailUrl } from "../lib/cloudinary";
import toast from "react-hot-toast";

export default function CloudinaryUploadWidget({ value, onChange, folder }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  async function handleFile(file) {
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadToCloudinary(file, folder || "admin-uploads");
      onChange({
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      });
      toast.success("Uploaded successfully");
    } catch (err) {
      toast.error("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="admin-upload-widget">
      {value?.url ? (
        <div className="admin-upload-preview">
          <img src={thumbnailUrl(value.publicId)} alt="Uploaded" />
          <button
            type="button"
            className="admin-upload-remove"
            onClick={() => onChange(null)}
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div
          className={`admin-upload-dropzone ${dragOver ? "dragover" : ""}`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 size={24} className="admin-spin" />
          ) : (
            <>
              <ImageIcon size={24} className="admin-upload-icon" />
              <span>Drop image or click to upload</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
          />
        </div>
      )}
    </div>
  );
}
