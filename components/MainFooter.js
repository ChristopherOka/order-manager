import Link from "next/link";

export default function MainFooter() {
    return (
        <section className="bg-gray-200 flex justify-between px-10 pt-8 pb-4 text-slate-800 border-t border-gray-300">
            <div>Copyright &copy; 2022 Martha Rave - All Rights Reserved.</div>
            <div>
                Created By{" "}
                <a
                    className="text-blue-500"
                    href="https://www.linkedin.com/in/christopher-oka/"
                >
                    Christopher Oka
                </a>
                <div className="text-blue-500 text-right font-bold">
                    <Link href="/login">
                        <a>Admin Login</a>
                    </Link>
                </div>
            </div>
        </section>
    );
}
