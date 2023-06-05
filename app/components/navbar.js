"use client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/authoptions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { MdHealthAndSafety } from "react-icons/md";

export default function Navbar() {
  const { data: session } = useSession();
  const [toggleNav, setToggleNav] = useState(false);
  const handleClick = () => {
    setToggleNav(!toggleNav);
  };

  if (session) {
    return (
      //   <div className="bg-green-500">
      //     <li>
      //       <Link href="/dashboard/schedule">Appointments</Link>
      //     </li>
      //     <li>
      //       <Link href="/dashboard/patients">Patients</Link>
      //     </li>

      //     <div>
      //       <button onClick={() => signOut()}>Sign out</button>
      //     </div>
      //   </div>
      <>
        <div className="flex justify-end">
          <button
            data-drawer-target="logo-sidebar"
            data-drawer-toggle="logo-sidebar"
            aria-controls="logo-sidebar"
            type="button"
            class="flex items-center mr-2 p-2 mt-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={handleClick}
          >
            <span class="sr-only">Open sidebar</span>
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              ></path>
            </svg>
          </button>
        </div>

        <aside
          id="logo-sidebar"
          // {toggleNav && (`fixed z-40 w-16 h-screen lg:block transition-transform -translate-x-full sm:translate-x-0 {hidden}`)}
          // className="fixed z-40 w-8 sm:w-16 h-screen transition-transform -translate-x-full sm:translate-x-0"
          className={`${
            toggleNav ? "" : "-translate-x-full"
          } fixed top-0 left-0 z-40 w-16 lg:w-16 h-screen transition-transform sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div class="h-full px-3 py-4 overflow-y-auto shadow-xl ">
            <div class="flex items-center mb-5">
              {/* Logo */}
              <MdHealthAndSafety className="text-4xl text-green-600" />
            </div>
            <ul class="space-y-2 font-medium">
              <li>
                <Link
                  href="#"
                  className="flex items-center p-2 rounded-lg hover:text-white hover:bg-green-300 w-full"
                >
                  <svg
                    aria-hidden="true"
                    className="transition duration-75 text-green-400 hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                    <rect className="w-full h-full opacity-0">
                      <title>Dashboard</title>
                    </rect>
                  </svg>
                  {/* <span class="ml-3">Dashboard</span> */}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/schedule"
                  className="flex items-center p-2 rounded-lg hover:text-white hover:bg-green-300 w-full"
                  onClick={handleClick}
                >
                  <svg
                    aria-hidden="true"
                    className="transition duration-75 text-green-400 hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    <rect className="w-full h-full opacity-0">
                      <title>Appointments</title>
                    </rect>
                  </svg>
                  {/* <span class="flex-1 ml-3 whitespace-nowrap">
                    Appointments
                  </span> */}
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/patients"
                  className="flex items-center p-2 rounded-lg hover:text-white hover:bg-green-300 w-full"
                  onClick={handleClick}
                >
                  <svg
                    aria-hidden="true"
                    className="transition duration-75 text-green-400 hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                    <rect className="w-full h-full opacity-0">
                      <title>Patients</title>
                    </rect>
                  </svg>
                  {/* <span class="flex-1 ml-3 whitespace-nowrap">Patients</span> */}
                </Link>
              </li>

              <li className="flex items-center p-2 rounded-lg hover:text-white hover:bg-green-300 w-full">
                {/* <svg
                  aria-hidden="true"
                  class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                > */}
                {/* <path
                    fill-rule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clip-rule="evenodd"
                  ></path>
                  <rect className="w-full h-full opacity-0">
                    <title>Sign out</title>
                  </rect>
                </svg> */}
                <button
                  onClick={() => signOut()}
                  className="flex-start whitespace-nowrap"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-green-400 transition duration-75 hover:text-white "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                      clip-rule="evenodd"
                    ></path>
                    <rect className="w-full h-full opacity-0">
                      <title>Sign out</title>
                    </rect>
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </>
    );
  }
  return null;
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
