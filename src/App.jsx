import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";
import Preloader from "./components/home/Preloader";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/shared/CustomCursor";
import HomePage from "./pages/HomePage";
import ProcessPage from "./pages/ProcessPage";
import ScrollToTop from "./components/shared/ScrollToTop";
import ContactPage from "./pages/ContactPage";
import WorkPage from "./pages/WorkPage";
import AboutPage from "./pages/AboutPage";

// Editor Panel
import { AuthProvider } from "./admin/lib/useAuth";
import AdminRoute from "./admin/components/AdminRoute";
import AdminLayout from "./admin/AdminLayout";
import LoginPage from "./admin/pages/LoginPage";
import DashboardPage from "./admin/pages/DashboardPage";
import ContentListPage from "./admin/pages/ContentListPage";
import ContentEditorPage from "./admin/pages/ContentEditorPage";
import MediaPage from "./admin/pages/MediaPage";
import SettingsPage from "./admin/pages/SettingsPage";
import "./admin/admin.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => setLoading(false), 2600);
    return () => clearTimeout(t);
  }, [isAdminRoute]);

  // Scroll to top on route change
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  // Editor Panel routes
  if (isAdminRoute) {
    return (
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a26",
              color: "#f0f0f5",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: "13px",
            },
          }}
        />
        <Routes>
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="content/:type" element={<ContentListPage />} />
            <Route path="content/:type/:id" element={<ContentEditorPage />} />
            <Route path="media" element={<MediaPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    );
  }

  // Public site routes
  return (
    <div className="noise">
      <CustomCursor />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" />}
      </AnimatePresence>

      {!loading && (
        <main>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </main>
      )}
    </div>
  );
}
