import "../styles/globals.css";
import { SupabaseProvider } from "../utils/supabase";

function MyApp({ Component, pageProps }) {
    return (
        <SupabaseProvider>
            <Component {...pageProps} />
        </SupabaseProvider>
    );
}

export default MyApp;
