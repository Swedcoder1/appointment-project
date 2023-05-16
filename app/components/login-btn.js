"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <button
            onClick={() =>
              signIn("github", { callbackUrl: "/dashboard/schedule" })
            }
            className="bg-gray-200 py-2 px-8 rounded-md text-lg shadow-md"
          >
            Sign in
          </button>
        </div>
      </>
    );
  }
}
