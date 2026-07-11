import api from "../api/axios";

export const loginUser = async (data) => {
  const response = await api.post("/myadmin/auth/login", data);
  return response.data;
};