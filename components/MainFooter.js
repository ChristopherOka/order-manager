import Link from "next/link";

export default function MainFooter() {
    return (
        <section className="bg-gray-200 flex flex-col justify-center px-10 pt-8 pb-4 gap-3 text-slate-800 border-t border-gray-300 sm:flex-row sm:justify-between sm:gap-10">
            <div className="text-center sm:text-left">Copyright &copy; 2023 Martha Rave - All Rights Reserved.</div>
            <div className="text-center sm:text-right">
                Created By{" "}
                <a
                    className="text-blue-500"
                    href="https://www.linkedin.com/in/christopher-oka/"
                >
                    Christopher Oka
                </a>
                <div className="text-center text-blue-500 font-bold sm:text-right">
                    <Link href="/login">
                        <a>Admin Login</a>
                    </Link>
                </div>
            </div>
        </section>
    );
}
