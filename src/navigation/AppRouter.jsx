import { Routes, Route } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout/AppLayout.jsx";
import Home from "../screens/_shared/Home.jsx";
import ModuleOverview from "../screens/_shared/ModuleOverview.jsx";
import NotFound from "../screens/_shared/NotFound.jsx";
import { screenRoutes } from "./routes.generated.js";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />

        {screenRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={<route.Component />} />
        ))}

        {/* Falls back to a screen-listing page for any bare module path,
            e.g. /reminder, /habit-tracker */}
        <Route path="/:moduleSlug" element={<ModuleOverview />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
