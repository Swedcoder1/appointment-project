"use client";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DeletePatient({ patient }) {
  const router = useRouter();
  const handleDelete = () => {
    const patientId = patient._id.toString();
    const alertConfirm = window.confirm(
      "Patient and their medical records will be deleted"
    );

    if (alertConfirm) {
      fetch("http://localhost:3000/api/patient/" + patientId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }).then((res) => {
        if (res.status === 200) {
          router.refresh();
          toast.success("Patient deleted", {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "colored",
          });
        }
      });
    } else {
      return;
    }
  };

  return (
    <>
      <button onClick={() => handleDelete(patient)} className="mr-2">
        Delete
      </button>

      <ToastContainer />
    </>
  );
}
