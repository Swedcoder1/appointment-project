import SearchPatient from "./SearchPatient";

const PatientPage = ({ session }) => {
  return (
    <>
      <SearchPatient />
      <div>PatientPage</div>
      <h1>Protected Page {session.user.name}</h1>
    </>
  );
};

export default PatientPage;
