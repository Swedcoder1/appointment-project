"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { formSchema } from "@/app/schema/yup/patientSchema";
import { getAllPatient } from "./PatientPage";

const NewPatient = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {openModal ? (
        <div className="fixed top-1/3 translate-x-1/2 -translate-y-1/2 right-1/2 z-50 w-1/2">
          <div className="bg-white shadow-md rounded-md py-8 px-4">
            <Formik
              initialValues={{ firstName: "", lastName: "", personalId: null }}
              validationSchema={formSchema}
              onSubmit={(values, { setSubmitting }) => {
                fetch("http://localhost:3000/api/patient", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                  cache: "no-store",
                });

                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);

                setOpenModal(false);
                getAllPatient();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="text"
                        name="firstName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        for="floating_first_name"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Firstname
                      </label>
                      <ErrorMessage name="firstName" component="div" />
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="text"
                        name="lastName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        for="floating_last_name"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lastname
                      </label>
                      <ErrorMessage name="lastName" component="div" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="number"
                        name="personalId"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                      />
                      <label
                        for="floating_phone"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Personal ID
                      </label>
                      <ErrorMessage name="personalId" component="div" />
                    </div>
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
        </div>
      ) : (
        <div>
          <button
            onClick={() => setOpenModal(true)}
            className="fixed right-4 bottom-4 text-white mb-10 mt-5 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Add patient
          </button>
        </div>
      )}
    </>
  );
};

export default NewPatient;
