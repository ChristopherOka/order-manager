import { getSession, signIn, useSession } from "next-auth/next";
import Link from "next/link";
import Button from "../components/Button";

export const allowedEmails = ["chriskroka@gmail.com", "marthamrave@gmail.com"];

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (
    process.env.NODE_ENV !== "development" &&
    session &&
    allowedEmails.includes(session.user.email)
  ) {
    console.log({ session });
    console.error("LOGGED IN");
    context.res.writeHead(302, { Location: "/home" });
    context.res.end();
  }
  return { props: {} };
}

export default function Login() {
  const { data: session, status } = useSession();
  // const router = useRouter();

  // if (status === "loading") {
  //   return <div>Loading...</div>;
  // }
  //
  // if (session && allowedEmails.includes(session.user.email)) {
  //   router.push("/home");
  //   return null;
  // }
  // if (session) {
  //   router.push("/");
  //   return null;
  // }
  return (
    <div className="flex items-center justify-center h-screen">
      {!session && (
        <>
          <div className="rounded-md bg-default-100 shadow-box p-5 flex flex-col items-center gap-5">
            <h1 className="font-bold text-4xl text-default-900">ADMIN LOGIN</h1>
            <Button
              type="primary"
              img="/images/icons/login.svg"
              clickHandler={() => {
                signIn("google");
                return true;
              }}
            >
              SIGN IN
            </Button>
          </div>
          <Link href="/">
            <a className="absolute rounded-md font-bold bg-default-900 text-default-100 m-4 px-10 py-2 top-0 left-0">
              BACK
            </a>
          </Link>
        </>
      )}
    </div>
  );
}
