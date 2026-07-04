import api from "../../../services/api";

export const getTemplates = () => api.get("/templates");
export const getTemplateById = (id) => api.get(`/templates/${id}`);
export const createTemplate = (data) => api.post("/templates", data);
export const updateTemplate = (id, data) => api.put(`/templates/${id}`, data);
export const deleteTemplate = (id) => api.delete(`/templates/${id}`);

const templateService = {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate
};

export default templateService;
