import "../styles/globals.css";
import { SupabaseProvider } from "../utils/supabase";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <SupabaseProvider>
                <Component {...pageProps} />
            </SupabaseProvider>
        </SessionProvider>
    );
}

export default MyApp;
