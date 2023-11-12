"use client";
import { Field, Form, Formik } from "formik";
import PreviousHistory from "@/app/components/journal/previousHistory";
import { historySchema } from "@/app/schema/yup/patientSchema";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page({ params }) {
  const { data: session } = useSession();
  const [checkSigned, setCheckSigned] = useState(false);
  const therapiestName = session?.user?.name;

  const patientId = params.patientId;
  const router = useRouter();

  return (
    <>
      <div className="flex">
        <Formik
          initialValues={{
            medicalHistory: "",
            assessment: "",
            medicalDiagnosis: "",
            exercise: "",
            followUp: "",
            patientId: patientId,
            therapiest: therapiestName,
            signed: checkSigned,
          }}
          validationSchema={historySchema}
          onSubmit={(values, { resetForm }) => {
            values.signed = checkSigned;
            fetch("http://localhost:3000/api/journal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
              cache: "no-store",
            })
              .then((res) => {
                res.json();
                router.push(`/dashboard/patients/${patientId}`);
                router.refresh();
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          {({ isSubmitting, values }) => (
            <div className="grid w-screen">
              <Form className="w-7/12 ml-4 mt-4 space-y-4">
                <div className="grid">
                  <label htmlFor="medicalHistory">Medical history</label>
                  <Field
                    name="medicalHistory"
                    id="medicalHistory"
                    as="textarea"
                    className="border-gray-500 border-2 h-28 rounded-md pl-1"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="assessment">Assessment</label>
                  <Field
                    name="assessment"
                    id="assessment"
                    as="textarea"
                    className="border-gray-500 border-2 h-28 rounded-md pl-1"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="medicalDiagnosis">Medical diagnosis</label>
                  <Field
                    name="medicalDiagnosis"
                    id="medicalDiagnosis"
                    type="text"
                    className="border-gray-500 border-2 h-12 rounded-md pl-1"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="exercise">Exercise</label>
                  <Field
                    name="exercise"
                    id="exercise"
                    as="textarea"
                    className="border-gray-500 border-2 h-12 rounded-md pl-1"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="followUp">Follow-up visit</label>
                  <Field
                    name="followUp"
                    id="followUp"
                    type="text"
                    className="border-gray-500 border-2 h-12 rounded-md pl-1"
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
      </div>
    </>
  );
}
