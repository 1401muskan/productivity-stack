import { useEffect, useState } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import "../styles/calendar.css";

import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../api/events";

interface EventType {
  id: string;
  title: string;
  start: string;
  end: string;
}

export default function Calendar() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [open, setOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [eventTitle, setEventTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [startTime, setStartTime] = useState("09:00");

  const [endTime, setEndTime] = useState("10:00");

  const fetchEvents = async () => {
    const response = await getEvents();

    setEvents(response.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (info: any) => {
    setEditingId(null);

    setEventTitle("");

    setSelectedDate(info.dateStr);

    setStartTime("09:00");
    setEndTime("10:00");

    setOpen(true);
  };

  const handleSaveEvent = async () => {
    if (!eventTitle.trim()) return;

    const start = `${selectedDate}T${startTime}:00`;

    const end = `${selectedDate}T${endTime}:00`;

    if (editingId) {
      await updateEvent(editingId, eventTitle, start, end);
    } else {
      await createEvent(eventTitle, start, end);
    }

    await fetchEvents();

    setEditingId(null);

    setEventTitle("");

    setStartTime("09:00");

    setEndTime("10:00");

    setOpen(false);
  };

  const handleEventClick = (info: any) => {
    setEditingId(info.event.id);

    setEventTitle(info.event.title);

    setSelectedDate(info.event.startStr.split("T")[0]);

    if (info.event.start) {
      setStartTime(info.event.start.toTimeString().slice(0, 5));
    }

    if (info.event.end) {
      setEndTime(info.event.end.toTimeString().slice(0, 5));
    }

    setOpen(true);
  };

  const handleDeleteEvent = async () => {
    if (!editingId) return;

    await deleteEvent(editingId);

    await fetchEvents();

    setEditingId(null);

    setEventTitle("");

    setOpen(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Calendar</h1>

        <p className="text-zinc-400 mt-2 text-lg">
          Schedule meetings, deadlines and important dates
        </p>
      </div>

      <div
        className="
          bg-zinc-900
          p-6
          rounded-3xl
          border
          border-zinc-800
          shadow-xl
        "
      >
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
            "
          >
            <p className="text-zinc-400">Total Events</p>

            <h3 className="text-3xl font-bold text-white mt-2">
              {events.length}
            </h3>
          </div>

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
            "
          >
            <p className="text-zinc-400">This Month</p>

            <h3 className="text-3xl font-bold text-white mt-2">
              {events.length}
            </h3>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setEditingId(null);

                setEventTitle("");

                setSelectedDate(today);

                setStartTime("09:00");

                setEndTime("10:00");

                setOpen(true);
              }}
              className="
                bg-violet-600
                hover:bg-violet-500
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
                transition
              "
            >
              + New Event
            </button>
          </div>

          <div
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-2xl
              p-5
            "
          >
            <p className="text-zinc-400">Upcoming</p>

            <h3 className="text-3xl font-bold text-white mt-2">
              {events.length}
            </h3>
          </div>
        </div>

        {/* <FullCalendar
          plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}
          initialView="timeGridWeek"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="700px"
        /> */}

        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="700px"
          // slotMinTime="08:00:00"
          // slotMaxTime="20:00:00"

          nowIndicator={true}
          allDaySlot={false}
          expandRows={true}
        />
      </div>

      {open && (
        <div
          className="
          fixed inset-0
          bg-black/70
          backdrop-blur-md
          flex
          items-center
          justify-center
          z-50
        "
        >
          <div
            className="
            w-[500px]
            bg-zinc-900
            animate-[fadeIn_0.2s_ease]
            border
            border-zinc-800
            rounded-3xl
            shadow-2xl
            overflow-hidden
          "
          >
            <div
              className="
              px-6
              py-5
              border-b
              border-zinc-800
            "
            >
              <h2
                className="
                  text-2xl
                  font-bold
                  text-white
                "
              >
                {editingId ? "Edit Event" : "Create Event"}
              </h2>

              <p
                className="
                  text-zinc-400
                  mt-1
                "
              >
                {editingId
                  ? "Update or delete this event"
                  : "Add a new event to your calendar"}
              </p>
            </div>

            <div className="p-6">
              <label
                className="
                text-sm
                text-zinc-400
                block
                mb-2
              "
              >
                Event Title
              </label>

              <input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder="Project Demo"
                className="
                w-full
                bg-zinc-800
                border
                border-zinc-700
                rounded-xl
                p-3
                text-white
                outline-none
                focus:border-violet-500
              "
              />
              <div className="mt-5">
                <label
                  className="
                    text-sm
                    text-zinc-400
                    block
                    mb-2
                  "
                >
                  Date
                </label>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="
                    w-full
                    bg-zinc-800
                    border
                    border-zinc-700
                    rounded-xl
                    p-3
                    text-white
                  "
                />
              </div>

              <div
                className="
    grid
    grid-cols-2
    gap-4
    mt-5
  "
              >
                <div>
                  <label
                    className="
        text-sm
        text-zinc-400
        block
        mb-2
      "
                  >
                    Start Time
                  </label>

                  <input
                    type="time"
                    step="300"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="
        w-full
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-3
        text-white
        outline-none
        focus:border-violet-500
      "
                  />
                </div>

                <div>
                  <label
                    className="
        text-sm
        text-zinc-400
        block
        mb-2
      "
                  >
                    End Time
                  </label>

                  <input
                    type="time"
                    step="300"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="
        w-full
        bg-zinc-800
        border
        border-zinc-700
        rounded-xl
        p-3
        text-white
        outline-none
        focus:border-violet-500
      "
                  />
                </div>
              </div>
            </div>

            <div
              className="
                px-6
                py-5
                border-t
                border-zinc-800
                flex
                justify-between
              "
            >
              <div>
                {editingId && (
                  <button
                    onClick={handleDeleteEvent}
                    className="
                      px-5
                      py-2.5
                      rounded-xl
                      bg-red-600
                      text-white
                      hover:bg-red-500
                    "
                  >
                    Delete
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-zinc-800
                    text-white
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleSaveEvent}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-violet-600
                    text-white
                  "
                >
                  {editingId ? "Save Changes" : "Create Event"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
