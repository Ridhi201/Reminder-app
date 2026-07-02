import "./UserSearchFilter.css";
import { FaSearch, FaUndo, FaUserPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/common/Button";

export default function UserSearchFilter({
  search,
  setSearch,
  role,
  setRole,
  status,
  setStatus
}) {
  const navigate = useNavigate();

  const handleReset = () => {
    setSearch("");
    setRole("All");
    setStatus("All");
  };

  return (
    <div className="user-filter">

      {/* Search */}

      <div className="search-box">

        <FaSearch className="search-icon"/>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or phone..."
        />

      </div>

      {/* Role */}

      <select value={role} onChange={(e) => setRole(e.target.value)}>

        <option value="All">All Roles</option>

        <option value="Admin">Admin</option>

        <option value="Manager">Manager</option>

        <option value="User">User</option>

      </select>

      {/* Status */}

      <select value={status} onChange={(e) => setStatus(e.target.value)}>

        <option value="All">All Status</option>

        <option value="Active">Active</option>

        <option value="Pending">Pending</option>

        <option value="Blocked">Blocked</option>

      </select>

      {/* Sort */}

      <select>

        <option>Newest First</option>

        <option>Oldest First</option>

        <option>A-Z</option>

        <option>Z-A</option>

      </select>

      <button className="reset-btn" onClick={handleReset}>

        <FaUndo />

        Reset

      </button>

      <Button onClick={() => navigate("/users/add")}>
        <FaUserPlus style={{ marginRight: 6 }} />
        Add User
      </Button>

    </div>
  );
}
