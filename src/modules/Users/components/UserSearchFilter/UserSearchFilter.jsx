import "./UserSearchFilter.css";
import { FaSearch, FaUndo } from "react-icons/fa";

export default function UserSearchFilter({
  search,
  setSearch,
  role,
  setRole
}) {

  const handleReset = () => {
    setSearch("");
    setRole("Admin");
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

        <option value="Admin">Admin</option>

      </select>

      <button className="reset-btn" onClick={handleReset}>

        <FaUndo />

        Reset

      </button>

    </div>
  );
}
