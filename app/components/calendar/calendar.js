// "use client";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useRef } from "react";
import CalendarModal from "./calendarModal";
import { useState } from "react";

export default function Calendar() {
  const calendarRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);

  // const handleDateClick = (info) => {
  //   // You can add your event creation logic here
  //   const { dateStr } = info;
  //   console.log("Clicked on date: ", dateStr);
  // };
  const handleDateClick = (info) => {
    // You can add your event creation logic here
    const { dateStr } = info;
    // alert("Clicked on date: " + info.dateStr);
    setOpenModal(true);
  };
  return (
    // <FullCalendar
    //   plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    //   initialView="dayGridWeek"
    //   editable={true}
    //   selectable={true}
    //   nowIndicator={true}
    // />
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
        initialEvents={[
          {
            title: "Alexander Carlgren",
            start: "2023-09-07T10:00:00",
            resourceId: "a",
            interactive: true,
            editable: true,
            url: "https://google.com/",
          },
        ]}
        eventClick={function (info) {
          alert(JSON.stringify(info.event.title));
          info.jsEvent.preventDefault(); // don't let the browser navigate

          if (info.event.url) {
            window.open(info.event.url);
          }
        }}
      />
      {openModal && <CalendarModal setOpenModal={setOpenModal} />}
    </div>
  );
}
