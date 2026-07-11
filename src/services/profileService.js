import api from "../api/axios";

// Fetch current user's profile
export const getMyProfile = async () => {
  const response = await api.get("/myadmin/profile/");
  return response.data;
};

// Fetch specific profile by ID
export const getProfileById = async (id) => {
  const response = await api.get(`/myadmin/profile/${id}`);
  return response.data;
};

// Update profile (either self or specific by ID)
export const updateProfile = async (id, data) => {
  const url = id ? `/myadmin/profile/${id}` : "/myadmin/profile/";
  const response = await api.put(url, data);
  return response.data;
};

