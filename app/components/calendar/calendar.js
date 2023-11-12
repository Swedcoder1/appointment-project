// "use client";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRef } from "react";
import CalendarModal from "./calendarModal";
import { useState, useEffect } from "react";
import PatientModal from "./patientModal";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import Loading from "../Loading";

export default function Calendar() {
  const [openModal, setOpenModal] = useState(false);
  const [dateStr, setDateStr] = useState(null);
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/appointments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log("Appointments " + data);
      });
  }, [openModal, open]);

  const handleDateClick = (info) => {
    setDateStr(info);
    // alert("Clicked on date: " + info.dateStr);
    setOpenModal(true);
  };

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          titleFormat={{
            month: "short",
            day: "2-digit",
            weekday: "short",
          }}
          eventTimeFormat={{
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            // hour12: false,
            meridiem: false,
          }}
          initialView="timeGridWeek"
          nowIndicator={true}
          // editable={true}
          selectable={true}
          selectMirror={true}
          weekends={false}
          businessHours={true}
          slotMinTime={"08:00:00"}
          slotMaxTime={"18:00:00"}
          slotDuration={"00:15:00"}
          stickyHeaderDates={true}
          dateClick={handleDateClick}
          //Display patient appointments
          events={data?.map((appointment) => ({
            id: appointment._id,
            _id: appointment.patientId,
            title: appointment.patientName,
            start: appointment.scheduleDate + "T" + appointment.scheduleTime,
          }))}
          eventClick={function (info) {
            setEventData(info);

            info.jsEvent.preventDefault(); // don't let the browser navigate
            setOpen(true);
            if (info.event.url) {
              window.open(info.event.url);
            }
          }}
          eventClassNames={"hover:cursor-pointer"}
        />
      </Suspense>
      {open && <PatientModal eventData={eventData} setOpen={setOpen} />}
      {openModal && (
        <CalendarModal setOpenModal={setOpenModal} dateStr={dateStr} />
      )}
    </div>
  );
}
