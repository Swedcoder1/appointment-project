import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import LoginBtn from "./components/login-btn";

export default function Home() {
  return (
    <div>
      <LoginBtn />
    </div>
  );
}
