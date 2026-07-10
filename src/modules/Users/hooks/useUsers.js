import { useMemo, useState } from "react";
import { users as initialUsers } from "../components/UserTable/users";

const STORAGE_KEY = "admin_users";

function loadUsers() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_) {}
  return initialUsers;
}

function saveUsers(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (_) {}
}

export default function useUsers() {
  const [usersList, setUsersList] = useState(loadUsers);
  const [search, setSearch]       = useState("");
  const [role, setRole]           = useState("Admin");
  const [status, setStatus]       = useState("All");

  const persist = (next) => {
    setUsersList(next);
    saveUsers(next);
  };

  /* ── Derived filtered list ── */
  const filteredUsers = useMemo(() => {
    return usersList.filter((user) => {
      const searchMatch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.phone.includes(search);
      const roleMatch   = role   === "All" || user.role   === role;
      const statusMatch = status === "All" || user.status === status;
      return searchMatch && roleMatch && statusMatch;
    });
  }, [usersList, search, role, status]);

  /* ── Mutations ── */
  const addUser = (userData) => {
    const newUser = {
      ...userData,
      id: Date.now(),
      joined: new Date().toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric",
      }),
    };
    persist([...usersList, newUser]);
    return newUser;
  };

  const deleteUsers = (ids) =>
    persist(usersList.filter((u) => !ids.includes(u.id)));

  const updateUsersStatus = (ids, newStatus) =>
    persist(usersList.map((u) => ids.includes(u.id) ? { ...u, status: newStatus } : u));

  const updateUser = (id, updatedFields) => {
    persist(usersList.map((u) => String(u.id) === String(id) ? { ...u, ...updatedFields } : u));
  };

  return {
    usersList,
    search, setSearch,
    role,   setRole,
    status, setStatus,
    filteredUsers,
    addUser,
    deleteUsers,
    updateUsersStatus,
    updateUser,
  };
}
