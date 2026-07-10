import { useNavigate } from "react-router-dom";
import PageHeader from "../../../components/common/PageHeader";

import UserStats from "../components/UserStats";
import UserSearchFilter from "../components/UserSearchFilter";
import UserTable from "../components/UserTable";
import useUsers from "../hooks/useUsers";

export default function Users() {
  const navigate = useNavigate();
  const {
    search,
    setSearch,
    role,
    setRole,
    status,
    setStatus,
    filteredUsers,
    deleteUsers,
    updateUsersStatus
  } = useUsers();

  return (
    <>
      <PageHeader
        title="Users"
        subtitle="Manage all registered users"
        buttonText="Add User"
        onButtonClick={() => navigate("/users/add")}
      />

      <UserStats />

      <UserSearchFilter
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
      />

      <UserTable
        users={filteredUsers}
        onBulkDelete={deleteUsers}
        onBulkStatusUpdate={updateUsersStatus}
      />
    </>
  );
}
