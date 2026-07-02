import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { PageHeader, Button, Toast } from "../../../../components/common";
import { getUserById, deleteUser as apiDeleteUser } from "../../../../services/userService";
import useUsers from "../../hooks/useUsers";

import "./ViewUser.css";

export default function ViewUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usersList, deleteUsers } = useUsers();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") =>
    setToast({ visible: true, message, type });

  const hideToast = () =>
    setToast((prev) => ({ ...prev, visible: false }));

  useEffect(() => {
    loadUser();
  }, [id, usersList]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await getUserById(id);
      if (res && res.data) {
        // Map single name to firstName/lastName if needed
        const u = res.data;
        const parts = (u.name || "").trim().split(/\s+/);
        const firstName = u.firstName || parts[0] || "";
        const lastName = u.lastName || parts.slice(1).join(" ") || "";
        setUser({
          ...u,
          firstName,
          lastName,
          gender: u.gender || "Male",
          dob: u.dob || "18 Jun 2002",
          address: u.address || "Jaipur, Rajasthan",
          city: u.city || "Jaipur",
          state: u.state || "Rajasthan",
          country: u.country || "India",
          zipCode: u.zipCode || u.zip || "302001",
          joined: u.joined || "10 Jun 2026",
          lastLogin: u.lastLogin || "Today 10:35 AM"
        });
      } else {
        throw new Error("No data returned from API");
      }
    } catch (err) {
      // Fallback: search in local usersList
      const localUser = usersList.find((u) => String(u.id) === String(id));
      if (localUser) {
        const parts = (localUser.name || "").trim().split(/\s+/);
        const firstName = localUser.firstName || parts[0] || "";
        const lastName = localUser.lastName || parts.slice(1).join(" ") || "";
        
        setUser({
          ...localUser,
          firstName,
          lastName,
          gender: localUser.gender || "Male",
          dob: localUser.dob || "18 Jun 2002",
          address: localUser.address || "Jaipur, Rajasthan",
          city: localUser.city || "Jaipur",
          state: localUser.state || "Rajasthan",
          country: localUser.country || "India",
          zipCode: localUser.zipCode || localUser.zip || "302001",
          joined: localUser.joined || "10 Jun 2026",
          lastLogin: localUser.lastLogin || "Today 10:35 AM"
        });
      } else {
        showToast("User not found", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete this user?`)) {
      try {
        await apiDeleteUser(id);
      } catch (err) {
        // Fallback: local delete
        deleteUsers([Number(id)]);
      }
      showToast("✓ User deleted successfully", "success");
      setTimeout(() => navigate("/users"), 1400);
    }
  };

  if (loading) {
    return (
      <div className="view-user-loading">
        <p>Loading user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="view-user-error">
        <Link to="/users" className="back-link">
          ← Back
        </Link>
        <p>User profile could not be loaded.</p>
      </div>
    );
  }

  const initials = `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase();

  return (
    <div className="view-user-page">
      <Link to="/users" className="back-link">
        ← Back
      </Link>

      <PageHeader
        title="View User"
        subtitle="User Profile Details"
        showButton={false}
      />

      <div className="profile-card">
        <div className="avatar-container">
          {user.photo ? (
            <img src={user.photo} alt={`${user.firstName} ${user.lastName}`} className="avatar-img" />
          ) : (
            <div className="avatar">{initials || "👤"}</div>
          )}
        </div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <span className="role-tag">
          {user.role}
        </span>
      </div>

      <div className="info-card">
        <h3>Personal Information</h3>
        <div className="info-grid">
          <div>
            <label>First Name</label>
            <p>{user.firstName || "—"}</p>
          </div>
          <div>
            <label>Last Name</label>
            <p>{user.lastName || "—"}</p>
          </div>
          <div>
            <label>Gender</label>
            <p>{user.gender || "—"}</p>
          </div>
          <div>
            <label>DOB</label>
            <p>{user.dob || "—"}</p>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h3>Contact Information</h3>
        <div className="info-grid">
          <div>
            <label>Email</label>
            <p className="email-text">{user.email || "—"}</p>
          </div>
          <div>
            <label>Phone</label>
            <p>{user.phone || "—"}</p>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h3>Role & Status</h3>
        <div className="info-grid">
          <div>
            <label>Role</label>
            <p>{user.role || "—"}</p>
          </div>
          <div>
            <label>Status</label>
            <div>
              <span className={`status-badge ${user.status?.toLowerCase() || ""}`}>
                {user.status || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card">
        <h3>Address</h3>
        <div className="info-grid">
          <div className="grid-full-width">
            <label>Address</label>
            <p>{user.address || "—"}</p>
          </div>
          <div>
            <label>City</label>
            <p>{user.city || "—"}</p>
          </div>
          <div>
            <label>State</label>
            <p>{user.state || "—"}</p>
          </div>
          <div>
            <label>Country</label>
            <p>{user.country || "—"}</p>
          </div>
          <div>
            <label>Zip</label>
            <p>{user.zipCode || user.zip || "—"}</p>
          </div>
        </div>
      </div>

      <div className="info-card meta-info-card">
        <div className="info-grid">
          <div>
            <label>Created At</label>
            <p>{user.joined || user.createdAt || "—"}</p>
          </div>
          <div>
            <label>Last Login</label>
            <p>{user.lastLogin || "—"}</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <Button variant="secondary" onClick={() => navigate(`/users/edit/${user.id}`)}>
          Edit User
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete User
        </Button>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}
