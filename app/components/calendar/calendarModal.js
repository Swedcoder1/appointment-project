"use client";
import React from "react";
import { getAllPatient } from "../patientComponents/PatientPage";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { appointmentSchema } from "@/app/schema/yup/appointmentSchema";

export default function CalendarModal({ setOpenModal, dateStr }) {
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/patient", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPatientData(data);
      });

    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error("Failed to fetch data");
    // }

    // return res.json();
  }, []);

  // function getPatients() {}

  // const patients = getPatients();
  console.log("From patientmodal  " + JSON.stringify(patientData));
  // console.log("dateStr " + JSON.stringify(dateStr.dateStr));
  let date = dateStr.dateStr.slice(0, 10);
  let time = dateStr.dateStr.slice(11, 16);
  // console.log("Date " + date, "Time" + time);
  let patientFullName;

  return (
    <div className="shadow-md border border-solid rounded-md bg-white w-2/5 top-1/3 fixed right-1/2 left-1/2 mr-auto -translate-x-1/2 z-50">
      <Formik
        initialValues={{
          patientName: "",
          scheduleDate: date,
          scheduleTime: time,
          patientId: null,
        }}
        // validationSchema={appointmentSchema}
        onSubmit={(values, { setSubmitting }) => {
          //Get patient id with find() method using the patient name and set the value to patientId.
          const result = patientData.find(
            (patient) =>
              patient.firstName + " " + patient.lastName == values.patientName
          );
          console.log("Find id with find() " + JSON.stringify(result));
          values.patientId = result._id;

          alert(JSON.stringify(values, null, 2));
          setTimeout(() => {
            setSubmitting(false);
          }, 400);

          fetch("http://localhost:3000/api/appointments", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            cache: "no-store",
          });

          setOpenModal(false);
        }}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form>
            <div className="text-center pb-10 pt-5">
              <Field
                type="text"
                name="patientName"
                id="patientName"
                list="patientNames"
                className="outline outline-1 outline-gray-700 w-3/5 py-2 pl-2 rounded-sm"
                placeholder="Add patient"
              />
              <datalist id="patientNames">
                {patientData?.map((patient) => {
                  let patientName = patient.firstName + " " + patient.lastName;

                  return (
                    <option value={patientName} key={patient._id}>
                      {patient.firstName} {patient.lastName} - {patient._id}
                    </option>
                  );
                })}
              </datalist>
              {errors.patientName && touched.patientName ? (
                <div>{errors.patientName}</div>
              ) : null}
            </div>
            <div className="text-center space-x-8">
              <Field
                type="date"
                name="scheduleDate"
                className="outline outline-1 outline-gray-700"
              />
              {errors.scheduleDate && touched.scheduleDate ? (
                <div>{errors.scheduleDate}</div>
              ) : null}
              <Field
                type="time"
                name="scheduleTime"
                className="outline outline-1 outline-gray-700"
              />
              {errors.scheduleTime && touched.scheduleTime ? (
                <div>{errors.scheduleTime}</div>
              ) : null}
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
              <button onClick={() => setOpenModal(false)}>Cancel</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
