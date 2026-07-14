import api from "../api/axios";

/**
 * Fetch all groups
 * GET http://localhost:5000/myadmin/groups/
 */
export const getGroups = async () => {
  const response = await api.get("/myadmin/groups/");
  return response.data;
};

/**
 * Create a new group
 * POST http://localhost:5000/myadmin/groups/
 */
export const createGroup = async (groupData) => {
  const response = await api.post("/myadmin/groups/", groupData);
  return response.data;
};

/**
 * Fetch a single group by ID
 * GET http://localhost:5000/myadmin/groups/:groupId
 */
export const getGroupById = async (groupId) => {
  const response = await api.get(`/myadmin/groups/${groupId}`);
  return response.data;
};

/**
 * Update an existing group by ID
 * PUT http://localhost:5000/myadmin/groups/:groupId
 */
export const updateGroup = async (groupId, groupData) => {
  const response = await api.put(`/myadmin/groups/${groupId}`, groupData);
  return response.data;
};

/**
 * Delete a group by ID
 * DELETE http://localhost:5000/myadmin/groups/:groupId
 */
export const deleteGroup = async (groupId) => {
  const response = await api.delete(`/myadmin/groups/${groupId}`);
  return response.data;
};

/**
 * Fetch all groups associated with a specific user ID
 * GET http://localhost:5000/myadmin/groups/user/:userId
 */
export const getGroupsByUserId = async (userId) => {
  const response = await api.get(`/myadmin/groups/user/${userId}`);
  return response.data;
};

/**
 * Fetch all members of a specific group by group ID
 * GET http://localhost:5000/myadmin/groups/:groupId/members
 */
export const getGroupMembers = async (groupId) => {
  const response = await api.get(`/myadmin/groups/${groupId}/members`);
  return response.data;
};

/**
 * Add a member to a group
 * POST http://localhost:5000/myadmin/groups/:groupId/members
 */
export const addGroupMember = async (groupId, memberData) => {
  const response = await api.post(`/myadmin/groups/${groupId}/members`, memberData);
  return response.data;
};

/**
 * Remove a member from a group
 * DELETE http://localhost:5000/myadmin/groups/:groupId/members/:memberId
 */
export const removeGroupMember = async (groupId, memberId) => {
  const response = await api.delete(`/myadmin/groups/${groupId}/members/${memberId}`);
  return response.data;
};

/**
 * Fetch group statistics
 * GET http://localhost:5000/myadmin/groups/stats
 */
export const getGroupStats = async () => {
  const response = await api.get("/myadmin/groups/stats");
  return response.data;
};

/**
 * Change the owner of a group
 * PUT http://localhost:5000/myadmin/groups/:groupId/change-owner
 */
export const changeGroupOwner = async (groupId, payload) => {
  const response = await api.put(`/myadmin/groups/${groupId}/change-owner`, payload);
  return response.data;
};

