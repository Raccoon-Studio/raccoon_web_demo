import { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";

const DEFAULT_SETTINGS = {
  siteName: "Raccoon Studio",
  siteTagline: "Digital Design & Development Agency",
  contactEmail: "",
  phone: "",
  address: "",
  socialInstagram: "",
  socialLinkedin: "",
  socialTwitter: "",
  socialDribbble: "",
  metaTitle: "",
  metaDescription: "",
  footerText: "",
};

export default function SettingsPage() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "settings", "global"));
        if (snap.exists()) {
          setSettings({ ...DEFAULT_SETTINGS, ...snap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await setDoc(doc(db, "settings", "global"), {
        ...settings,
        updatedAt: serverTimestamp(),
      });
      toast.success("Settings saved!");
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSaving(false);
    }
  }

  function update(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  if (loading) {
    return <div className="admin-loader"><div className="admin-spinner" /></div>;
  }

  const sections = [
    {
      title: "General",
      fields: [
        { key: "siteName", label: "Site Name" },
        { key: "siteTagline", label: "Tagline" },
      ],
    },
    {
      title: "Contact",
      fields: [
        { key: "contactEmail", label: "Email" },
        { key: "phone", label: "Phone" },
        { key: "address", label: "Address" },
      ],
    },
    {
      title: "Social Links",
      fields: [
        { key: "socialInstagram", label: "Instagram URL" },
        { key: "socialLinkedin", label: "LinkedIn URL" },
        { key: "socialTwitter", label: "Twitter / X URL" },
        { key: "socialDribbble", label: "Dribbble URL" },
      ],
    },
    {
      title: "SEO & Meta",
      fields: [
        { key: "metaTitle", label: "Meta Title" },
        { key: "metaDescription", label: "Meta Description", textarea: true },
      ],
    },
    {
      title: "Footer",
      fields: [
        { key: "footerText", label: "Footer Text" },
      ],
    },
  ];

  return (
    <div className="admin-settings">
      <div className="admin-page-header">
        <h1>Settings</h1>
        <button
          className="admin-btn admin-btn-primary"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? <Loader2 size={14} className="admin-spin" /> : <Save size={14} />}
          Save Settings
        </button>
      </div>

      <form onSubmit={handleSave} className="admin-settings-form">
        {sections.map((section) => (
          <div key={section.title} className="admin-settings-section">
            <h2>{section.title}</h2>
            <div className="admin-settings-fields">
              {section.fields.map((field) => (
                <div key={field.key} className="admin-field">
                  <label htmlFor={`setting-${field.key}`}>{field.label}</label>
                  {field.textarea ? (
                    <textarea
                      id={`setting-${field.key}`}
                      value={settings[field.key] || ""}
                      onChange={(e) => update(field.key, e.target.value)}
                      rows={3}
                    />
                  ) : (
                    <input
                      id={`setting-${field.key}`}
                      type="text"
                      value={settings[field.key] || ""}
                      onChange={(e) => update(field.key, e.target.value)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
    </div>
  );
}
