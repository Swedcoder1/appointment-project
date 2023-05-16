import { SessionProvider } from "next-auth/react";
import Home from "./page";

export default function App({ Home, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Home {...pageProps} />
    </SessionProvider>
  );
}
