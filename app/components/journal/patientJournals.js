"use client";
import { Fragment, useState } from "react";
import UpdateJournal from "./updateJournal";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function PatientJournal({ journalData }) {
  const [openUpdateJournal, setOpenUpdateJournal] = useState(false);
  const [updateJournal, setUpdateJournal] = useState(null);
  const router = useRouter();

  // console.log("From PatientJournal " + JSON.stringify(journalData, null, " "));

  const deleteJournal = (journalId) => {
    fetch("http://localhost:3000/api/journal/" + journalId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
        router.refresh();
      })
      .catch((error) => console.log(error));
  };

  const findId = (journal) => {
    setUpdateJournal(journal);
    setOpenUpdateJournal(true);
  };

  return (
    <>
      <div>
        {journalData.map((journal) => {
          //Get date when the journal was saved
          const showDate = JSON.stringify(journal.createdAt).slice(1, 11);
          const journalId = journal._id.toString();
          return (
            <Fragment key={journalId}>
              <div
                className="mb-6 w-11/12 m-auto outline-1 outline rounded-sm"
                key={journalId}
              >
                <div className="bg-gray-100 pl-4 py-2 flex justify-between pr-4 items-center">
                  <div>
                    <p className="font-semibold">
                      Therapiest: {journal.therapiest}
                    </p>
                    <p>{showDate}</p>
                  </div>
                  <div>
                    {journal.signed ? (
                      <p className="text-green-500 font-semibold">Signed</p>
                    ) : (
                      <>
                        <p className="text-red-500 font-semibold mb-1">
                          Not signed
                        </p>
                        <div className="flex justify-center space-x-2 items-center text-lg">
                          <button onClick={() => findId(journal)}>
                            <FiEdit />
                          </button>
                          <button onClick={() => deleteJournal(journalId)}>
                            <FaRegTrashAlt className="text-red-500" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="grid space-y-2 ml-4">
                  <p>Medicalhistory: "{journal.journals.medicalHistory}"</p>
                  <p>Assessment: "{journal.journals.assessment}"</p>
                  <p>Medicaldiagnosis: "{journal.journals.medicalDiagnosis}"</p>
                  <p>Exercise: "{journal.journals.exercise}"</p>
                  <p>Follow-up:"{journal.journals.followUp}"</p>
                </div>
              </div>
              {openUpdateJournal && (
                <UpdateJournal
                  updateJournal={updateJournal}
                  setOpenUpdateJournal={setOpenUpdateJournal}
                />
              )}
            </Fragment>
          );
        })}
      </div>
    </>
  );
}
