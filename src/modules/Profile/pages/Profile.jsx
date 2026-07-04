import { useState, useRef } from "react";
import { useAuthContext } from "../../../context/AuthContext";
import { storageService } from "../../../services/storage.service";
import "./Profile.css";

export default function Profile() {
  const { user, login } = useAuthContext();

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

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatar(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleProfileSave = () => {
    const updated = { ...user, ...form, avatar };
    login(updated, !!storageService.get("auth_user", null));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
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
