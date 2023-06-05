"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { MdHealthAndSafety } from "react-icons/md";

export default function LoginBtn() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <div className="shadow-md py-4 px-4">
            <div className="mb-10 flex justify-center">
              <MdHealthAndSafety className="text-3xl text-green-600" />
              <h1 className="text-xl text-center">YouCare</h1>
            </div>
            <button
              onClick={() =>
                signIn("github", { callbackUrl: "/dashboard/schedule" })
              }
              className="bg-gray-200 py-2 px-8 rounded-md text-lg shadow-md"
            >
              Sign in
            </button>
          </div>
        </div>
      </>
    );
  }
}
