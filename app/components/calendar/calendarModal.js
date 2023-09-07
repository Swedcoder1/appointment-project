"use client";
import React from "react";

export default function CalendarModal({ setOpenModal }) {
  return (
    <div className="shadow-md border border-solid rounded-md bg-white w-2/5 top-1/3 fixed right-1/2 left-1/2 mr-auto -translate-x-1/2 z-50">
      <div className="text-center pb-10 pt-5">
        <p>Schedule patient</p>
        <input
          type="text"
          className="outline outline-1 outline-gray-700"
          placeholder="Patient name"
        />
      </div>
      <div className="flex justify-center space-x-8">
        <div className="text-center  ">
          <p>Date</p>
          <input type="date" className="outline outline-1 outline-gray-700" />
        </div>
        <div className="text-center  ">
          <p>Time</p>
          <input type="time" className="outline outline-1 outline-gray-700" />
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-10">
        <button className="bg-green-400 text-white">Add</button>
        <button onClick={() => setOpenModal(false)}>Cancel</button>
      </div>
    </div>
  );
}
