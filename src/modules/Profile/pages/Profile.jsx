import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext";
import { storageService } from "../../../services/storage.service";
import { getMyProfile, getProfileById, updateProfile } from "../../../services/profileService";
import StatusBadge from "../../../components/common/StatusBadge";
import "./Profile.css";

export default function Profile() {
  const { user, login } = useAuthContext();
  const navigate = useNavigate();

  // Subscription state
  const [subPlan, setSubPlan] = useState(() => {
    return localStorage.getItem("active_subscription_plan") || "pro";
  });
  const [subInterval, setSubInterval] = useState(() => {
    return localStorage.getItem("active_subscription_interval") || "monthly";
  });

  useEffect(() => {
    const handleSubUpdate = () => {
      setSubPlan(localStorage.getItem("active_subscription_plan") || "pro");
      setSubInterval(localStorage.getItem("active_subscription_interval") || "monthly");
    };
    window.addEventListener("subscription_updated", handleSubUpdate);
    return () => window.removeEventListener("subscription_updated", handleSubUpdate);
  }, []);

  // Profile form
  const [form, setForm]   = useState({
    name:  user?.name  ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
    role:  user?.role  ?? "",
  });
  const [avatar, setAvatar] = useState(user?.avatar ?? "https://i.pravatar.cc/150?img=5");
  const [profileSaved, setProfileSaved] = useState(false);

  // Password form
  const [pwForm, setPwForm] = useState({ current: "", newPw: "", confirm: "" });
  const [pwError, setPwError]   = useState("");
  const [pwSaved, setPwSaved]   = useState(false);

  const fileRef = useRef();

  const setField = (key, val) => setForm((f) => ({ ...f, [key]: val }));
  const setPwField = (key, val) => setPwForm((f) => ({ ...f, [key]: val }));

  // Fetch profile on mount / user ID change
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = user?.id || user?._id;
        let profileData;
        if (userId && userId !== 1) { // 1 is mock ID
          profileData = await getProfileById(userId);
        } else {
          profileData = await getMyProfile();
        }

        if (profileData) {
          setForm({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            role: profileData.role || "",
          });
          if (profileData.avatar) {
            setAvatar(profileData.avatar);
          }
          login(
            { ...user, ...profileData },
            !!storageService.get("auth_user", null)
          );
        }
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, [user?.id, user?._id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleProfileSave = async () => {
    try {
      const userId = user?.id || user?._id;
      const cleanUserId = (userId && userId !== 1) ? userId : null;
      const updatedData = { ...form, avatar };
      const response = await updateProfile(cleanUserId, updatedData);

      const updatedUser = { 
        ...user, 
        ...(response?.user || response || updatedData) 
      };
      
      login(updatedUser, !!storageService.get("auth_user", null));
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2500);
    } catch (err) {
      console.error("Failed to save profile:", err);
    }
  };

  const handlePasswordSave = () => {
    setPwError("");
    if (!pwForm.current) { setPwError("Please enter your current password."); return; }
    if (pwForm.newPw.length < 6) { setPwError("New password must be at least 6 characters."); return; }
    if (pwForm.newPw !== pwForm.confirm) { setPwError("Passwords do not match."); return; }
    setPwForm({ current: "", newPw: "", confirm: "" });
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 2500);
  };

  const SaveBtn = ({ saved, onClick, id }) => (
    <button
      id={id}
      onClick={onClick}
      style={{
        padding: "10px 24px",
        background: "var(--cobalt)",
        color: "white",
        border: "none",
        borderRadius: 8,
        fontWeight: 600,
        cursor: "pointer",
        fontSize: 14,
      }}
    >
      {saved ? "✓ Saved!" : "Save Changes"}
    </button>
  );

  return (
    <div className="profile-screen screen">
      <div className="profile-header">
        <h1 className="profile-title">My Profile</h1>
        <p className="profile-subtitle">Manage your account information and password</p>
      </div>

      <div className="profile-body">

        {/* ── Avatar card ─────────────────────────────── */}
        <div className="profile-avatar-card">
          <div className="profile-avatar-wrap">
            <img src={avatar} alt="Avatar" className="profile-avatar-img" />
            <button
              className="profile-avatar-btn"
              onClick={() => fileRef.current.click()}
              title="Change photo"
              id="avatar-upload-btn"
            >
              📷
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
              id="avatar-file-input"
            />
          </div>
          <div className="profile-avatar-info">
            <h2 className="profile-name">{form.name || "—"}</h2>
            <span className="profile-role-badge">{form.role || "—"}</span>
          </div>
          <p className="profile-avatar-hint">Click the camera icon to change your photo</p>
        </div>

        {/* ── Subscription Card ────────────────────────── */}
        <div className="profile-card">
          <h3 className="profile-card-title">Subscription Details</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <strong style={{ fontSize: "18px", color: "var(--ink)", fontFamily: "var(--font-display)" }}>
                  {subPlan === "free" ? "Basic Plan (Free)" : subPlan === "enterprise" ? "Enterprise Plan" : "Pro Plan"}
                </strong>
                <StatusBadge status={subPlan === "free" ? "Free" : "Premium"} />
              </div>
              <p style={{ margin: 0, fontSize: "13.5px", color: "var(--ink-muted)", lineHeight: 1.4 }}>
                {subPlan === "free" 
                  ? "Upgrade to Pro or Enterprise to unlock unlimited reminders and advanced integrations." 
                  : `Your plan is active and will renew on 14 Aug 2026. Billed ${subInterval}.`
                }
              </p>
            </div>
            <button
              onClick={() => navigate("/settings/billing")}
              style={{
                padding: "10px 18px",
                background: "transparent",
                border: "1.5px solid var(--border)",
                color: "var(--ink)",
                borderRadius: 8,
                fontWeight: 600,
                cursor: "pointer",
                fontSize: 13.5,
                transition: "all 0.15s ease",
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = "var(--ink)"; e.currentTarget.style.background = "var(--surface-muted)"; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}
              id="profile-manage-billing-btn"
            >
              Manage Subscription
            </button>
          </div>
        </div>

        {/* ── Profile form ─────────────────────────────── */}
        <div className="profile-card">
          <h3 className="profile-card-title">Personal Information</h3>

          <div className="profile-form">
            <div className="profile-row">
              <div className="profile-field">
                <label className="profile-label">Full Name</label>
                <input
                  className="profile-input"
                  value={form.name}
                  onChange={(e) => setField("name", e.target.value)}
                  id="profile-name"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">Role</label>
                <input
                  className="profile-input"
                  value={form.role}
                  readOnly
                  style={{ opacity: 0.7, cursor: "not-allowed" }}
                  id="profile-role"
                />
              </div>
            </div>

            <div className="profile-row">
              <div className="profile-field">
                <label className="profile-label">Email</label>
                <input
                  className="profile-input"
                  type="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  id="profile-email"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">Phone</label>
                <input
                  className="profile-input"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  id="profile-phone"
                />
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <SaveBtn saved={profileSaved} onClick={handleProfileSave} id="profile-save-btn" />
          </div>
        </div>

        {/* ── Change password ───────────────────────────── */}
        <div className="profile-card">
          <h3 className="profile-card-title">Change Password</h3>

          {pwError && (
            <div className="profile-error" role="alert">{pwError}</div>
          )}

          <div className="profile-form">
            <div className="profile-field">
              <label className="profile-label">Current Password</label>
              <input
                className="profile-input"
                type="password"
                value={pwForm.current}
                onChange={(e) => setPwField("current", e.target.value)}
                placeholder="Enter current password"
                id="pw-current"
              />
            </div>
            <div className="profile-row">
              <div className="profile-field">
                <label className="profile-label">New Password</label>
                <input
                  className="profile-input"
                  type="password"
                  value={pwForm.newPw}
                  onChange={(e) => setPwField("newPw", e.target.value)}
                  placeholder="Min. 6 characters"
                  id="pw-new"
                />
              </div>
              <div className="profile-field">
                <label className="profile-label">Confirm New Password</label>
                <input
                  className="profile-input"
                  type="password"
                  value={pwForm.confirm}
                  onChange={(e) => setPwField("confirm", e.target.value)}
                  placeholder="Repeat new password"
                  id="pw-confirm"
                />
              </div>
            </div>
          </div>

          <div className="profile-actions">
            <SaveBtn saved={pwSaved} onClick={handlePasswordSave} id="pw-save-btn" />
          </div>
        </div>

      </div>
    </div>
  );
}
