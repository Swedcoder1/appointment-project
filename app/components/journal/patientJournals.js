export default function PatientJournal({ journalData }) {
  console.log("From PatientJournal " + JSON.stringify(journalData, null, " "));
  return (
    <div>
      {journalData.map((journal) => (
        <div
          className="mb-6 w-11/12 m-auto outline-1 outline rounded-sm"
          key={journal._id}
        >
          <div className="bg-gray-100 pl-4 py-2">
            <p className="font-semibold">Therapiest: {journal.therapiest}</p>
            {/* <p>{journal.createdAt}</p> */}
          </div>
          <div className="grid space-y-2 ml-4">
            <p>Medicalhistory: "{journal.journals.medicalHistory}"</p>
            <p>Assessment: "{journal.journals.assessment}"</p>
            <p>Medicaldiagnosis: "{journal.journals.medicalDiagnosis}"</p>
            <p>Exercise: "{journal.journals.exercise}"</p>
            <p>Follow-up:"{journal.journals.followUp}"</p>
          </div>
        </div>
      ))}
    </div>
  );
}
