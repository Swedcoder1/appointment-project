import "./globals.css";
import { Inter } from "next/font/google";
import AuthProviders from "./authproviders";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Appointmentsystem",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProviders>
          <Navbar />
          <div className="md:!pl-16">{children}</div>
          <ToastContainer
            position="top-center"
            autoClose={1000}
            pauseOnHover={false}
            draggable={false}
            hideProgressBar={true}
            closeOnClick={true}
          />
        </AuthProviders>
      </body>
    </html>
  );
}
