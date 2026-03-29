import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Image,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./lib/useAuth";
import toast from "react-hot-toast";

const sidebarLinks = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", exact: true },
  { to: "/admin/content/projects", icon: FolderOpen, label: "Projects" },
  { to: "/admin/content/testimonials", icon: FileText, label: "Testimonials" },
  { to: "/admin/content/services", icon: FileText, label: "Services" },
  { to: "/admin/media", icon: Image, label: "Media" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  async function handleSignOut() {
    await signOut();
    toast.success("Signed out");
  }

  return (
    <div className="admin-layout">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-sidebar-header">
          <div className="admin-sidebar-brand">
            <span className="admin-brand-icon">R</span>
            <span className="admin-brand-text">Raccoon Editor</span>
          </div>
          <button
            className="admin-sidebar-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="admin-sidebar-nav">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.exact}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <link.icon size={18} />
              <span>{link.label}</span>
              <ChevronRight size={14} className="admin-nav-arrow" />
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="admin-user-details">
              <span className="admin-user-name">
                {user?.displayName || "Editor"}
              </span>
              <span className="admin-user-email">{user?.email}</span>
            </div>
          </div>
          <button className="admin-signout-btn" onClick={handleSignOut}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="admin-breadcrumb">
            {location.pathname
              .replace("/admin", "")
              .split("/")
              .filter(Boolean)
              .map((seg, i, arr) => (
                <span key={seg}>
                  {i > 0 && <ChevronRight size={12} className="admin-bc-sep" />}
                  <span className={i === arr.length - 1 ? "active" : ""}>
                    {seg.charAt(0).toUpperCase() + seg.slice(1)}
                  </span>
                </span>
              ))}
            {location.pathname === "/admin" && (
              <span className="active">Dashboard</span>
            )}
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
