import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import PageHeader from "../../../../components/common/PageHeader";
import EventModal from "../../components/EventModal";
import EventDetails from "../../components/EventDetails";
import useCalendar from "../../hooks/useCalendar";
import Toast from "../../../../components/common/Toast";

import "./CalendarPage.css";

export default function CalendarPage() {
  const {
    events,
    selectedDate,
    setSelectedDate,
    selectedEvent,
    setSelectedEvent,
    modalOpen,
    setModalOpen,
    createEvent,
    updateEvent,
    deleteEvent
  } = useCalendar();

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
  };

  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const rawEvent = events.find((ev) => String(ev.id) === String(info.event.id));
    setSelectedEvent(
      rawEvent || {
        id: info.event.id,
        title: info.event.title,
        start: info.event.startStr,
        ...info.event.extendedProps
      }
    );
    setDetailsOpen(true);
  };

  const handleDeleteEvent = (eventToDelete) => {
    if (window.confirm(`Are you sure you want to delete "${eventToDelete.title}"?`)) {
      deleteEvent(eventToDelete.id);
      setDetailsOpen(false);
    }
  };

  const handleEventDrop = async (info) => {
    try {
      await updateEvent(info.event.id, {
        start: info.event.startStr,
        end: info.event.endStr || null
      });
      showToast("Event updated successfully", "success");
    } catch (err) {
      info.revert();
      showToast("Update failed", "error");
    }
  };

  const handleEventResize = async (info) => {
    try {
      await updateEvent(info.event.id, {
        start: info.event.startStr,
        end: info.event.endStr || null
      });
      showToast("Event duration updated", "success");
    } catch (err) {
      info.revert();
      showToast("Update failed", "error");
    }
  };

  return (
    <div className="calendar-page">
      <PageHeader
        title="Calendar"
        subtitle="Manage reminders and events"
        buttonText="Add Event"
        onButtonClick={() => {
          setSelectedDate(new Date().toISOString().split("T")[0]);
          setModalOpen(true);
        }}
      />

      <div className="calendar-card">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
            interactionPlugin
          ]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }}
          editable={true}
          droppable={true}
          selectable={true}
          weekends={true}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          eventResize={handleEventResize}
          height="auto"
        />
      </div>

      <EventModal
        open={modalOpen}
        selectedDate={selectedDate}
        onClose={() => setModalOpen(false)}
        onSave={createEvent}
      />

      <EventDetails
        open={detailsOpen}
        event={selectedEvent}
        onClose={() => setDetailsOpen(false)}
        onEdit={(ev) => {
          console.log("Edit Event:", ev);
        }}
        onDelete={handleDeleteEvent}
      />

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
      />
    </div>
  );
}
