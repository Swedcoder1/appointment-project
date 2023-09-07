"use client";
import { Field, Form, Formik } from "formik";
import PreviousHistory from "@/app/components/journal/previousHistory";
import { historySchema } from "@/app/schema/yup/patientSchema";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function page({ params }) {
  const { data: session } = useSession();
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
          }}
          validationSchema={historySchema}
          onSubmit={(values, { resetForm }) => {
            // alert(JSON.stringify(values));
            fetch("http://localhost:3000/api/journal", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
              cache: "no-store",
            });

            router.push(`/dashboard/patients/${patientId}`);
            router.refresh();
          }}
        >
          {({ isSubmitting }) => (
            <div className="grid w-screen">
              <div className="flex w-7/12 space-x-4 mt-6 text-lg ml-4">
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
              </div>
              <Form className="w-7/12 ml-4 mt-4 space-y-4">
                <div className="grid">
                  <label htmlFor="medical-history">Medical history</label>
                  <Field
                    name="medicalHistory"
                    as="textarea"
                    className="border-gray-500 border-2 h-28 rounded-md"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="assessment">Assessment</label>
                  <Field
                    name="assessment"
                    as="textarea"
                    className="border-gray-500 border-2 h-28 rounded-md"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="medical-diagnosis">Medical diagnosis</label>
                  <Field
                    name="medicalDiagnosis"
                    type="text"
                    className="border-gray-500 border-2 h-12 rounded-md"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="exercise">Exercise</label>
                  <Field
                    name="exercise"
                    as="textarea"
                    className="border-gray-500 border-2 h-12 rounded-md"
                  />
                </div>
                <div className="grid">
                  <label htmlFor="folow-up">Follow-up visit</label>
                  <Field
                    name="followUp"
                    type="text"
                    className="border-gray-500 border-2 h-12 rounded-md"
                  />
                </div>
                <button
                  className="bg-green-500 text-white py-2 px-12 rounded-md"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Save & Sign
                </button>
              </Form>
            </div>
          )}
        </Formik>
        <PreviousHistory />
      </div>
    </>
  );
}
