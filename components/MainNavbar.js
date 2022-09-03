import Link from "next/link";

export default function MainNavbar(props) {
    return (
        <section className="bg-black flex justify-center items-center">
            <nav className="text-lg text-default-100 flex justify-center items-center gap-8 py-4">
                <Link href="/">
                    <a
                        className={`${
                            props.active == "home" ? "font-bold" : ""
                        }`}
                    >
                        HOME
                    </a>
                </Link>
                <Link href="/orders">
                    <a
                        className={`${
                            props.active == "shop" ? "font-bold" : ""
                        }`}
                    >
                        SHOP
                    </a>
                </Link>
            </nav>
        </section>
    );
}
