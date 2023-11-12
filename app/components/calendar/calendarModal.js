"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log("From patientmodal  " + JSON.stringify(patientData));
  // console.log("dateStr " + JSON.stringify(dateStr.dateStr));
  let date = dateStr.dateStr.slice(0, 10);
  let time = dateStr.dateStr.slice(11, 16);
  // console.log("Date " + date, "Time" + time);
  // let patientFullName;

  return (
    <div className="shadow-md border border-solid rounded-md bg-white lg:w-1/3 md:w-8/12 w-10/12 top-1/3 fixed right-1/2 left-1/2 mr-auto -translate-x-1/2 z-50">
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
          // console.log("Find id with find() " + JSON.stringify(result));
          values.patientId = result._id;

          // alert(JSON.stringify(values, null, 2));
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
          })
            .then((res) => {
              res.json();
              setOpenModal(false);
            })
            .catch((error) => error);
        }}
      >
        {({ isSubmitting, values, errors, touched }) => (
          <Form>
            <div className="text-center pb-6 pt-10">
              <Field
                type="text"
                name="patientName"
                id="patientName"
                list="patientNames"
                className="outline outline-1 outline-gray-700 sm:w-2/4 w-8/12 py-2 pl-2 rounded-sm"
                placeholder="Choose patient"
              />
              <datalist id="patientNames">
                {patientData?.map((patient) => {
                  let patientName = patient.firstName + " " + patient.lastName;
                  //Get Date of birth as xxxxxxxx instead of xxxx-xx-xx
                  let patientDateOfBirth = patient.dateOfBirth.replace(
                    /-/g,
                    ""
                  );

                  return (
                    <option value={patientName} key={patient._id}>
                      {patient.firstName} {patient.lastName} -{" "}
                      {patientDateOfBirth}
                    </option>
                  );
                })}
              </datalist>
              {errors.patientName && touched.patientName ? (
                <div>{errors.patientName}</div>
              ) : null}
            </div>
            <div className="flex justify-center space-x-6">
              <div className="flex flex-col">
                <label className="text-center">Date</label>
                <Field
                  type="date"
                  name="scheduleDate"
                  className="outline outline-1 outline-gray-700"
                />
                {errors.scheduleDate && touched.scheduleDate ? (
                  <div>{errors.scheduleDate}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label className="text-center">Time</label>
                <Field
                  type="time"
                  name="scheduleTime"
                  className="outline outline-1 outline-gray-700"
                />
                {errors.scheduleTime && touched.scheduleTime ? (
                  <div>{errors.scheduleTime}</div>
                ) : null}
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-8 pb-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg sm:w-auto px-5 py-2.5 text-center"
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
