"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { formSchema } from "@/app/schema/yup/patientSchema";
import { getAllPatient } from "./PatientPage";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import config from "@/config";

const NewPatient = () => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { data: session } = useSession({ required: true });
  console.log(session?.user?.name);

  return (
    <>
      {openModal ? (
        <div className="fixed top-1/3 translate-x-1/2 -translate-y-1/2 right-1/2 z-50 lg:w-2/5 w-4/5">
          <div className="bg-white shadow-md rounded-md py-8 px-4">
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                therapiest: session?.user?.name,
              }}
              validationSchema={formSchema}
              onSubmit={(values, { setSubmitting }) => {
                fetch(`${config.domainUrl}/api/patient`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                  cache: "no-store",
                }).then((res) => {
                  // res.json();
                  console.log(res);
                  if (res.status === 200) {
                    setSubmitting(false);
                    setOpenModal(false);
                    router.refresh();
                    toast.success("Patient created");
                  } else if (res.status === 409) {
                    setSubmitting(false);
                    setOpenModal(false);
                    toast.warning("Patient already exist");
                  }
                });
              }}
              //grid md:grid-cols-2 md:gap-6
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="flex flex-col md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                      <Field
                        type="text"
                        name="firstName"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=""
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
                        placeholder=""
                      />
                      <label
                        for="floating_last_name"
                        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >
                        Lastname
                      </label>
                      <ErrorMessage name="lastName" component="div" />
                    </div>
                    <div className="grid md:gap-6">
                      <div className="relative z-0 w-full mb-6 group">
                        <Field
                          type="date"
                          name="dateOfBirth"
                          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                          placeholder="YYYY-MM-DD"
                          min="1923-11-02"
                          max="2015-11-02"
                        />
                        <label
                          for="floating_phone"
                          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                        >
                          Date of birth(YYYY-MM-DD)
                        </label>
                        <ErrorMessage name="dateOfBirth" component="div" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-1/3 px-5 py-2.5 text-center "
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
            // className="fixed right-4 top-12 text-white mb-10 mt-5 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3"
            className=" ml-4 text-white mt-5 bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3"
          >
            New patient
          </button>
        </div>
      )}
    </>
  );
};

export default NewPatient;
