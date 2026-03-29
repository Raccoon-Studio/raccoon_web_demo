import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft, Eye, Clock, Loader2 } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  COLLECTIONS,
  getDocumentById,
  createDocument,
  updateDocument,
  publishDocument,
} from "../lib/contentManager";
import CloudinaryUploadWidget from "../components/CloudinaryUploadWidget";
import toast from "react-hot-toast";

const EDITOR_SCHEMAS = {
  projects: {
    label: "Project",
    fields: [
      { name: "title", type: "text", label: "Title", required: true },
      { name: "tagline", type: "text", label: "Tagline" },
      { name: "num", type: "text", label: "Number (01, 02…)" },
      { name: "description", type: "richtext", label: "Description" },
      { name: "tags", type: "tags", label: "Tech Tags (comma separated)" },
      { name: "gradient", type: "text", label: "Gradient CSS Classes" },
      { name: "accent", type: "text", label: "Accent CSS Class" },
      { name: "image", type: "image", label: "Featured Image" },
    ],
  },
  testimonials: {
    label: "Testimonial",
    fields: [
      { name: "name", type: "text", label: "Client Name", required: true },
      { name: "role", type: "text", label: "Role / Company" },
      { name: "initials", type: "text", label: "Initials (e.g. AR)" },
      { name: "quote", type: "textarea", label: "Quote" },
    ],
  },
  services: {
    label: "Service",
    fields: [
      { name: "name", type: "text", label: "Service Name", required: true },
      { name: "techs", type: "text", label: "Technologies" },
      { name: "value", type: "number", label: "Proficiency (%)" },
    ],
  },
};

const QUILL_MODULES = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "blockquote", "code-block"],
    ["clean"],
  ],
};

export default function ContentEditorPage() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";
  const schema = EDITOR_SCHEMAS[type] || EDITOR_SCHEMAS.projects;
  const collName = COLLECTIONS[type] || type;

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      getDocumentById(collName, id).then((doc) => {
        if (doc) setFormData(doc);
        else toast.error("Document not found");
        setLoading(false);
      });
    }
  }, [id, collName, isNew]);

  const updateField = useCallback((name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  async function handleSave(status) {
    setSaving(true);
    try {
      const payload = { ...formData };
      delete payload.id;
      if (status) payload.status = status;

      if (isNew) {
        const newId = await createDocument(collName, payload);
        toast.success("Created!");
        navigate(`/admin/content/${type}/${newId}`, { replace: true });
      } else {
        await updateDocument(collName, id, payload);
        if (status === "published") {
          await publishDocument(collName, id);
        }
        toast.success(status === "published" ? "Published!" : "Saved as draft");
      }
    } catch (err) {
      toast.error("Save failed: " + err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-loader">
        <div className="admin-spinner" />
      </div>
    );
  }

  return (
    <div className="admin-editor">
      <div className="admin-editor-header">
        <button
          className="admin-btn admin-btn-ghost"
          onClick={() => navigate(`/admin/content/${type}`)}
        >
          <ArrowLeft size={16} /> Back
        </button>
        <h1>{isNew ? `New ${schema.label}` : `Edit ${schema.label}`}</h1>
        <div className="admin-editor-actions">
          <button
            className="admin-btn admin-btn-secondary"
            onClick={() => handleSave("draft")}
            disabled={saving}
          >
            {saving ? <Loader2 size={14} className="admin-spin" /> : <Clock size={14} />}
            Save Draft
          </button>
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => handleSave("published")}
            disabled={saving}
          >
            {saving ? <Loader2 size={14} className="admin-spin" /> : <Eye size={14} />}
            Publish
          </button>
        </div>
      </div>

      <div className="admin-editor-form">
        {schema.fields.map((field) => (
          <div key={field.name} className="admin-field">
            <label htmlFor={`field-${field.name}`}>
              {field.label}
              {field.required && <span className="admin-required">*</span>}
            </label>

            {field.type === "text" && (
              <input
                id={`field-${field.name}`}
                type="text"
                value={formData[field.name] || ""}
                onChange={(e) => updateField(field.name, e.target.value)}
                placeholder={field.label}
              />
            )}

            {field.type === "number" && (
              <input
                id={`field-${field.name}`}
                type="number"
                value={formData[field.name] || ""}
                onChange={(e) => updateField(field.name, Number(e.target.value))}
                placeholder={field.label}
              />
            )}

            {field.type === "textarea" && (
              <textarea
                id={`field-${field.name}`}
                value={formData[field.name] || ""}
                onChange={(e) => updateField(field.name, e.target.value)}
                rows={4}
                placeholder={field.label}
              />
            )}

            {field.type === "richtext" && (
              <ReactQuill
                theme="snow"
                value={formData[field.name] || ""}
                onChange={(val) => updateField(field.name, val)}
                modules={QUILL_MODULES}
                placeholder="Write content here..."
              />
            )}

            {field.type === "tags" && (
              <input
                id={`field-${field.name}`}
                type="text"
                value={
                  Array.isArray(formData[field.name])
                    ? formData[field.name].join(", ")
                    : formData[field.name] || ""
                }
                onChange={(e) =>
                  updateField(
                    field.name,
                    e.target.value.split(",").map((t) => t.trim())
                  )
                }
                placeholder="REACT, NEXT JS, TAILWINDCSS"
              />
            )}

            {field.type === "image" && (
              <CloudinaryUploadWidget
                value={formData[field.name]}
                onChange={(val) => updateField(field.name, val)}
                folder={type}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
