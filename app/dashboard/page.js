import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import clientPromise from "@/lib/mongodb";

async function checkUser() {
  try {
    //Get user session.
    const session = await getServerSession(authOptions);
    const userName = await session?.user?.name;
    console.log("Username:" + userName);

    //Find if a user already exists in the database.
    const client = await clientPromise;
    const db = client.db("appointment");
    const findUser = await db
      .collection("users")
      .findOne({ username: userName });
    console.log(findUser);

    //If the user exist just return else add the user to the databse.
    if (findUser) {
      return;
    } else {
      const userData = { username: userName, email: session?.user?.email };
      db.collection("users").insertOne(userData, function (err, res) {
        if (err) throw err;
        res.json(console.log("1 document inserted"));
      });
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
