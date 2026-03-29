import { useState, useEffect } from "react";
import {
  FolderOpen,
  FileText,
  Image,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { COLLECTIONS, getCollectionCount, getPublishedCount, getDraftCount } from "../lib/contentManager";

const STAT_CARDS = [
  { key: "projects",      label: "Projects",       icon: FolderOpen, color: "#3b82f6" },
  { key: "testimonials",  label: "Testimonials",   icon: FileText,   color: "#10b981" },
  { key: "services",      label: "Services",       icon: TrendingUp, color: "#f59e0b" },
  { key: "media",         label: "Media Files",    icon: Image,      color: "#06b6d4" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const results = {};
        for (const card of STAT_CARDS) {
          const collName = COLLECTIONS[card.key] || card.key;
          const [total, published, draft] = await Promise.all([
            getCollectionCount(collName),
            getPublishedCount(collName).catch(() => 0),
            getDraftCount(collName).catch(() => 0),
          ]);
          results[card.key] = { total, published, draft };
        }
        setStats(results);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Overview of your website content</p>
      </div>

      <div className="admin-stats-grid">
        {STAT_CARDS.map((card) => {
          const data = stats[card.key] || { total: 0, published: 0, draft: 0 };
          return (
            <div key={card.key} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: `${card.color}15`, color: card.color }}>
                <card.icon size={22} />
              </div>
              <div className="admin-stat-info">
                <span className="admin-stat-value">
                  {loading ? "—" : data.total}
                </span>
                <span className="admin-stat-label">{card.label}</span>
              </div>
              {!loading && (
                <div className="admin-stat-badges">
                  <span className="admin-badge admin-badge-green">
                    <CheckCircle2 size={11} /> {data.published}
                  </span>
                  <span className="admin-badge admin-badge-yellow">
                    <Clock size={11} /> {data.draft}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="admin-quick-actions">
        <h2>Quick Actions</h2>
        <div className="admin-actions-grid">
          <a href="/admin/content/projects?new=1" className="admin-action-card">
            <FolderOpen size={20} />
            <span>New Project</span>
          </a>
          <a href="/admin/content/testimonials?new=1" className="admin-action-card">
            <FileText size={20} />
            <span>New Testimonial</span>
          </a>
          <a href="/admin/media" className="admin-action-card">
            <Image size={20} />
            <span>Upload Media</span>
          </a>
          <a href="/admin/settings" className="admin-action-card">
            <AlertCircle size={20} />
            <span>Site Settings</span>
          </a>
        </div>
      </div>
    </div>
  );
}
