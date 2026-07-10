import { Routes, Route } from "react-router-dom";
import { TemplateList, AddTemplate, EditTemplate, ViewTemplate } from "./index";

export default function TemplatesRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TemplateList />} />
      <Route path="add" element={<AddTemplate />} />
      <Route path="edit/:id" element={<EditTemplate />} />
      <Route path="view/:id" element={<ViewTemplate />} />
    </Routes>
  );
}
