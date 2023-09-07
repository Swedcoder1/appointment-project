import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import User from "../schema/mongoose/userModel";

async function checkUser() {
  try {
    //Get user session.
    const session = await getServerSession(authOptions);
    const userName = await session?.user?.name;
    console.log("Username:" + userName);

    //Find if a user already exists in the database.
    await dbConnect();
    const findUser = await User.findOne({ userName: userName });
    console.log(findUser);

    //If the user exist just return else add the user to the databse.
    if (findUser) {
      console.log("user already exist");
      return;
    } else {
      const userData = { userName: userName, email: session?.user?.email };
      User.create(userData);
      console.log("User created");
    }
  } catch (error) {
    console.log(error);
  }
}

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  checkUser();

  if (session) {
    return (
      <>
        <div>Dashboard</div>
      </>
    );
  }
  return (
    <p>
      Access Denied. You need to{" "}
      <Link className="text-blue-600" href="/">
        log in
      </Link>
    </p>
  );
};

export default Dashboard;
