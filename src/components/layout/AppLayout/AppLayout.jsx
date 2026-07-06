import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Topbar from "../Topbar/Topbar.jsx";
import Loader from "../../common/Loader/Loader.jsx";
import "./AppLayout.css";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="app-layout__main">
        <Topbar onMenuClick={() => setSidebarOpen((prev) => !prev)} />
        <div className="app-layout__content">
          <Suspense fallback={<Loader label="Loading screen…" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
