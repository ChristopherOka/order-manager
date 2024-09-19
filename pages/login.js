import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Button";

export const allowedEmails = ["chriskroka@gmail.com", "marthamrave@gmail.com"];

export default function Login() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  console.log(session);
  if (session && allowedEmails.includes(session.user.email)) {
    router.push("/home");
    return;
  }
  if (session) {
    router.push("/");
    return;
  }
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
                signIn();
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
