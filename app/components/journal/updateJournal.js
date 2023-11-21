"use client";
import { Field, Form, Formik } from "formik";
import { historySchema } from "@/app/schema/yup/patientSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import config from "@/config";

export default function UpdateJournal({ updateJournal, setOpenUpdateJournal }) {
  const [checkSigned, setCheckSigned] = useState(false);
  const router = useRouter();

  console.log("update journal " + updateJournal);
  return (
    <div className="flex fixed top-0 bg-white w-screen h-screen z-50">
      <Formik
        // enableReinitialize={true}
        initialValues={{
          medicalHistory: updateJournal.journals.medicalHistory,
          assessment: updateJournal.journals.assessment,
          medicalDiagnosis: updateJournal.journals.medicalDiagnosis,
          exercise: updateJournal.journals.exercise,
          followUp: updateJournal.journals.followUp,
          patientId: updateJournal.patientId,
          therapiest: updateJournal.therapiestName,
          signed: checkSigned,
          journalId: updateJournal._id,
        }}
        validationSchema={historySchema}
        onSubmit={(values, { resetForm }) => {
          values.signed = checkSigned;
          // alert(JSON.stringify(values));

          fetch(`${config.domainUrl}/api/journal/` + updateJournal.patientId, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
            cache: "no-store",
          }).then((res) => {
            console.log(res);
            router.refresh();
            setOpenUpdateJournal(false);
            // router.push(`/dashboard/patients/${updateJournal.patientId}`);
          });
        }}
      >
        {({ isSubmitting, values, props }) => (
          <div className="grid w-screen h-full">
            {/* <div className="flex w-7/12 space-x-4 mt-6 text-lg ml-4">
                <button
                  className="bg-green-500 text-white py-2 px-12 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save & Sign
                </button>
                <button className="outline outline-green-500 py-2 px-8 rounded-md">
                  Save & don´t sign
                </button>
              </div> */}
            <Form className="w-7/12 ml-4 mt-4 space-y-4">
              <div className="grid">
                <label htmlFor="medicalHistory">Medical history</label>
                <Field
                  name="medicalHistory"
                  id="medicalHistory"
                  as="textarea"
                  className="border-gray-500 border-2 h-28 rounded-md"
                />
              </div>
              <div className="grid">
                <label htmlFor="assessment">Assessment</label>
                <Field
                  name="assessment"
                  id="assessment"
                  as="textarea"
                  className="border-gray-500 border-2 h-28 rounded-md"
                />
              </div>
              <div className="grid">
                <label htmlFor="medicalDiagnosis">Medical diagnosis</label>
                <Field
                  name="medicalDiagnosis"
                  id="medicalDiagnosis"
                  type="text"
                  className="border-gray-500 border-2 h-12 rounded-md"
                />
              </div>
              <div className="grid">
                <label htmlFor="exercise">Exercise</label>
                <Field
                  name="exercise"
                  id="exercise"
                  as="textarea"
                  className="border-gray-500 border-2 h-12 rounded-md"
                />
              </div>
              <div className="grid">
                <label htmlFor="followUp">Follow-up visit</label>
                <Field
                  name="followUp"
                  id="followUp"
                  type="text"
                  className="border-gray-500 border-2 h-12 rounded-md"
                />
              </div>
              <div className="space-x-4">
                <button
                  className="bg-green-500 text-white py-2 px-12 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                  name="signed"
                  onClick={() => setCheckSigned(true)}
                >
                  Save & Sign
                </button>
                <button
                  className="outline outline-green-500 py-2 px-8 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save unsigned
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
      {/* <PreviousHistory /> */}
    </div>
    // <div className="absolute top-1 bg-white w-screen h-screen">
    //   updateJournal
    //   {updateJournal._id}
    //   {updateJournal.journals.medicalHistory}
    // </div>
  );
}
