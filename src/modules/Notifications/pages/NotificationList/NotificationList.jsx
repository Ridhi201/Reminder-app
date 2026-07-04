import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./NotificationList.css";

import PageHeader from "../../../../components/common/PageHeader";

import NotificationStats from "../../components/NotificationStats";
import NotificationFilters from "../../components/NotificationFilters";
import NotificationTable from "../../components/NotificationTable";
import useNotifications from "../../hooks/useNotifications";

export default function NotificationList() {
    const navigate = useNavigate();
    const {
        filteredNotifications,
        fetchNotifications,
        stats,
        search,
        setSearch,
        type,
        setType,
        status,
        setStatus,
    } = useNotifications();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const handleResetFilters = () => {
        setSearch("");
        setType("All");
        setStatus("All");
    };

    return (
        <div className="notification-page">
            <PageHeader
                title="Notifications"
                subtitle="Manage Push, Email & SMS Notifications"
                buttonText="Send Notification"
                onButtonClick={() => navigate("/notifications/send")}
            />

            <div className="module-tabs">
                <button 
                    className="tab-btn active" 
                    onClick={() => navigate("/notifications")}
                >
                    Overview
                </button>
                <button 
                    className="tab-btn" 
                    onClick={() => navigate("/notifications/history")}
                >
                    History
                </button>
                <button 
                    className="tab-btn" 
                    onClick={() => navigate("/notifications/analytics")}
                >
                    Analytics
                </button>
            </div>

            <NotificationStats stats={stats} />

            <NotificationFilters
                search={search}
                setSearch={setSearch}
                type={type}
                setType={setType}
                status={status}
                setStatus={setStatus}
                onReset={handleResetFilters}
            />

            <NotificationTable
                notifications={filteredNotifications}
                loadNotifications={fetchNotifications}
            />
        </div>
    );
}

