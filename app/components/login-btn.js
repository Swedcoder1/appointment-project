"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <>
        Not signed in <br />
        <button
          onClick={() =>
            signIn("github", { callbackUrl: "/dashboard/schedule" })
          }
        >
          Sign in
        </button>
      </>
    );
  }
}
