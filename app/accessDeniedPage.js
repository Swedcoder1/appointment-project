import Link from "next/link";

const AccessDeniedPage = () => {
  return (
    <div className="flex space-x-1 text-2xl justify-center items-center mt-10">
      <p>Access Denied. You need to</p>
      <Link className="text-blue-600" href="/">
        log in
      </Link>
    </div>
  );
};

export default AccessDeniedPage;
