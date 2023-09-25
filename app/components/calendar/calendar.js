// "use client";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRef } from "react";
import CalendarModal from "./calendarModal";
import { useState, useEffect } from "react";
import PatientModal from "./patientModal";

export default function Calendar() {
  const calendarRef = useRef(null);
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
  }, []);
  // const handleDateClick = (info) => {
  //   // You can add your event creation logic here
  //   const { dateStr } = info;
  //   console.log("Clicked on date: ", dateStr);
  // };
  const handleDateClick = (info) => {
    // You can add your event creation logic here
    setDateStr(info);
    // alert("Clicked on date: " + info.dateStr);
    setOpenModal(true);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek",
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
        editable={true}
        selectable={true}
        selectMirror={true}
        weekends={false}
        businessHours={true}
        slotMinTime={"08:00:00"}
        slotMaxTime={"18:00:00"}
        slotDuration={"00:15:00"}
        stickyHeaderDates={true}
        dateClick={handleDateClick}
        // handleWindowResize={true}
        // events={[
        //   {
        //     title: "Alexander Carlgren",
        //     start: "2023-09-20T10:00:00",
        //     resourceId: "a",
        //     interactive: true,
        //     editable: true,
        //     url: "https://google.com/",
        //   },
        // ]}
        events={data?.map((appointment) => ({
          id: appointment.patientId,
          _id: appointment._id,
          title: appointment.patientName,
          start: appointment.scheduleDate + "T" + appointment.scheduleTime,
        }))}
        eventClick={function (info) {
          // alert(JSON.stringify(info.event.title));
          setEventData(info);
          // alert(JSON.stringify(info.event.id));

          info.jsEvent.preventDefault(); // don't let the browser navigate
          setOpen(true);
          if (info.event.url) {
            window.open(info.event.url);
          }
        }}
      />
      {open && <PatientModal eventData={eventData} setOpen={setOpen} />}
      {openModal && (
        <CalendarModal setOpenModal={setOpenModal} dateStr={dateStr} />
      )}
    </div>
  );
}
