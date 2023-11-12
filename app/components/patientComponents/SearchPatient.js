"use client";
import { HiOutlineSearch } from "react-icons/hi";
import { useState } from "react";
import Link from "next/link";
import DeletePatient from "./deletePatient";
import { Suspense } from "react";
import Loading from "../Loading";
import NewPatient from "./newPatient";

const SearchPatient = ({ patientData }) => {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  //Search for patient
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    // console.log(searchInput);
    if (searchInput !== "") {
      const filteredData = patientData.filter((patient) => {
        return Object.values(patient)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
      // console.log("SearchResult" + JSON.stringify(filteredData));
    } else {
      setFilteredResults(patientData);
    }
  };

  return (
    <>
      <div>
        <form>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <HiOutlineSearch className="text-2xl" />
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-gray-900 border-b-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search patients.."
              onChange={(e) => searchItems(e.target.value)}
              required
            />
          </div>
        </form>
      </div>
      <NewPatient />

      <div className="mt-14 overflow-y-auto lg:h-96 md:h-80 h-72">
        {searchInput.length > 1
          ? filteredResults.map((patient) => (
              <div
                className="flex justify-between pt-4 pb-1 border-b-2 hover:bg-gray-100"
                key={patient._id.toString()}
              >
                <Link
                  href={`/dashboard/patients/${patient._id.toString()}`}
                  className="hover:cursor-pointer w-full "
                >
                  <div className="flex space-x-1 ml-4">
                    <p>{patient.firstName}</p>
                    <p>{patient.lastName}</p>
                    <p>{patient.dateOfBirth}</p>
                  </div>
                </Link>
                <DeletePatient patient={patient} />
              </div>
            ))
          : patientData.map((patient) => (
              <div
                className="flex justify-between pt-4 pb-1 border-b-2 hover:bg-gray-100"
                key={patient._id.toString()}
              >
                <Link
                  href={`/dashboard/patients/${patient._id.toString()}`}
                  className="hover:cursor-pointer w-full"
                >
                  <div className="flex space-x-1 ml-4">
                    <p>{patient.firstName}</p>
                    <p>{patient.lastName}</p>
                    <p>{patient.dateOfBirth}</p>
                  </div>
                </Link>
                <DeletePatient patient={patient} />
              </div>
            ))}
      </div>
    </>
  );
};

export default SearchPatient;
