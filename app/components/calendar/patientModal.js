"use client";
import Link from "next/link";

export default function PatientModal({ eventData, setOpen }) {
  let date = eventData.event.startStr.slice(0, 10);
  let time = eventData.event.startStr.slice(11, 16);

  const deletePatientAppointment = () => {
    // console.log("From delete func " + JSON.stringify(eventData.event.id));
    const id = eventData.event.id;

    fetch("http://localhost:3000/api/appointments/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
        setOpen(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="shadow-md border border-solid rounded-md bg-white w-2/5 top-1/3 fixed right-1/2 left-1/2 mr-auto -translate-x-1/2 z-50">
      <button onClick={() => setOpen(false)} className="ml-2 mt-2">
        X
      </button>
      <div className="text-center mb-4">
        <p>Patient</p>
        <p className="font-semibold">{eventData.event.title}</p>
      </div>
      <div className="text-center">
        <p>Time</p>
        <p className="font-semibold">{date}</p>
        <p className="font-semibold">{time}</p>
      </div>

      <div className="space-x-4 ml-2 mt-6 mb-2">
        <Link
          href={`/dashboard/patients/${eventData.event.extendedProps._id}`}
          className="hover:cursor-pointer"
          target="_blank"
          rel="noopener noreferrer"
        >
          Patientjournal
        </Link>

        <button onClick={deletePatientAppointment}>Delete</button>
      </div>
    </div>
  );
}
