import { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Eye,
  MoreVertical,
} from "lucide-react";
import {
  COLLECTIONS,
  getDocuments,
  deleteDocument,
  publishDocument,
  unpublishDocument,
} from "../lib/contentManager";
import toast from "react-hot-toast";

const CONTENT_CONFIG = {
  projects: {
    label: "Projects",
    fields: ["title", "tagline"],
    displayField: "title",
  },
  testimonials: {
    label: "Testimonials",
    fields: ["name", "role", "quote"],
    displayField: "name",
  },
  services: {
    label: "Services",
    fields: ["name", "description"],
    displayField: "name",
  },
};

export default function ContentListPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);

  const config = CONTENT_CONFIG[type] || { label: type, fields: [], displayField: "title" };
  const collName = COLLECTIONS[type] || type;

  useEffect(() => {
    loadItems();
    if (searchParams.get("new") === "1") {
      navigate(`/admin/content/${type}/new`);
    }
  }, [type]);

  async function loadItems() {
    setLoading(true);
    try {
      const docs = await getDocuments(collName);
      setItems(docs);
    } catch (err) {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this item permanently?")) return;
    try {
      await deleteDocument(collName, id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.success("Deleted");
    } catch {
      toast.error("Delete failed");
    }
  }

  async function handleTogglePublish(item) {
    try {
      if (item.status === "published") {
        await unpublishDocument(collName, item.id);
        toast.success("Moved to draft");
      } else {
        await publishDocument(collName, item.id);
        toast.success("Published!");
      }
      loadItems();
    } catch {
      toast.error("Status change failed");
    }
  }

  const filtered = items.filter((item) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return config.fields.some((f) => item[f]?.toLowerCase?.().includes(q));
  });

  return (
    <div className="admin-content-list">
      <div className="admin-page-header">
        <div>
          <h1>{config.label}</h1>
          <p>
            {items.length} total · {items.filter((i) => i.status === "published").length} published
          </p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          onClick={() => navigate(`/admin/content/${type}/new`)}
        >
          <Plus size={16} />
          <span>Add {config.label.replace(/s$/, "")}</span>
        </button>
      </div>

      <div className="admin-toolbar">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="text"
            placeholder={`Search ${config.label.toLowerCase()}…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="admin-loader">
          <div className="admin-spinner" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="admin-empty">
          <p>No {config.label.toLowerCase()} found</p>
          <button
            className="admin-btn admin-btn-secondary"
            onClick={() => navigate(`/admin/content/${type}/new`)}
          >
            Create first one
          </button>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td className="admin-table-title">
                    {item[config.displayField] || "Untitled"}
                  </td>
                  <td>
                    <span
                      className={`admin-status ${
                        item.status === "published" ? "published" : "draft"
                      }`}
                    >
                      {item.status === "published" ? (
                        <CheckCircle2 size={12} />
                      ) : (
                        <Clock size={12} />
                      )}
                      {item.status || "draft"}
                    </span>
                  </td>
                  <td className="admin-table-date">
                    {item.updatedAt?.toDate
                      ? item.updatedAt.toDate().toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="admin-table-actions">
                    <div className="admin-actions-menu-wrap">
                      <button
                        className="admin-icon-btn"
                        onClick={() =>
                          setActiveMenu(activeMenu === item.id ? null : item.id)
                        }
                      >
                        <MoreVertical size={16} />
                      </button>
                      {activeMenu === item.id && (
                        <div className="admin-dropdown">
                          <button
                            onClick={() => {
                              navigate(`/admin/content/${type}/${item.id}`);
                              setActiveMenu(null);
                            }}
                          >
                            <Edit3 size={14} /> Edit
                          </button>
                          <button
                            onClick={() => {
                              handleTogglePublish(item);
                              setActiveMenu(null);
                            }}
                          >
                            {item.status === "published" ? (
                              <><Clock size={14} /> Unpublish</>
                            ) : (
                              <><Eye size={14} /> Publish</>
                            )}
                          </button>
                          <button
                            className="danger"
                            onClick={() => {
                              handleDelete(item.id);
                              setActiveMenu(null);
                            }}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
