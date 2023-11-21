"use client";
import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import config from "@/config";

export default function PatientModal({ eventData, setOpen }) {
  let date = eventData.event.startStr.slice(0, 10);
  let time = eventData.event.startStr.slice(11, 16);

  const deletePatientAppointment = () => {
    // console.log("From delete func " + JSON.stringify(eventData.event.id));
    const id = eventData.event.id;

    fetch(`${config.domainUrl}/api/appointments/` + id, {
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
    <div className="shadow-md border border-solid rounded-md bg-white w-1/3 top-1/3 fixed right-1/2 left-1/2 mr-auto -translate-x-1/2 z-50">
      <AiOutlineClose
        onClick={() => setOpen(false)}
        className="ml-2 mt-2 hover:cursor-pointer text-xl"
      />

      <div className="text-center mb-4">
        <p>Patient</p>
        <p className="font-semibold">{eventData.event.title}</p>
      </div>
      <div className="text-center">
        <p>Scheduled</p>
        <div className="flex justify-center space-x-2">
          <p className="font-semibold">{date}</p>
          <p className="font-semibold">{time}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mr-2 ml-2 mt-6 mb-2">
        <Link
          href={`/dashboard/patients/${eventData.event.extendedProps._id}`}
          className="hover:cursor-pointer text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg sm:w-auto px-5 py-2.5 text-center"
          target="_blank"
          rel="noopener noreferrer"
        >
          Patientjournal
        </Link>

        <FaRegTrashAlt
          className="text-2xl hover:cursor-pointer text-red-600"
          onClick={deletePatientAppointment}
        >
          Delete
        </FaRegTrashAlt>
      </div>
    </div>
  );
}
