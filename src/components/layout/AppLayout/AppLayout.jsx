import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar.jsx";
import Topbar from "../Topbar/Topbar.jsx";
import Loader from "../../common/Loader/Loader.jsx";
import "./AppLayout.css";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-layout__main">
        <Topbar />
        <div className="app-layout__content">
          <Suspense fallback={<Loader label="Loading screen…" />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
