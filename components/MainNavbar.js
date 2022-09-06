import Link from "next/link";
import { useState, useEffect } from "react";

export default function MainNavbar(props) {
    const [cookiesDropdownState, setCookiesDropdownState] = useState(false);
    useEffect(() => {
        if (cookiesDropdownState) {
            document.addEventListener(
                "mousedown",
                (e) => {
                    if (e.target.text !== "COOKIES") {
                        setCookiesDropdownState(false);
                    }
                },
                { once: true }
            );
        }
    }, [cookiesDropdownState]);

    return (
        <section className="bg-black flex justify-center items-center">
            <nav className="text-lg text-default-100 flex justify-center items-center py-4">
                <div>
                    <Link href="/">
                        <a
                            className={`${
                                props.active == "home" ? "font-bold" : ""
                            } px-2`}
                        >
                            HOME
                        </a>
                    </Link>
                </div>

                <div className="cursor-pointer relative">
                    <a
                        className="px-3"
                        onClick={() => {
                            setCookiesDropdownState(!cookiesDropdownState);
                        }}
                    >
                        COOKIES
                    </a>
                    {cookiesDropdownState ? (
                        <div className="animate-dropDown origin-top-left absolute top-10 z-10 flex flex-col gap-2 bg-black p-3 rounded-b-md">
                            <Link href="/">
                                <a
                                    className={`${
                                        props.active == "shop"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    CHRISTMAS
                                </a>
                            </Link>
                            <Link href="/">
                                <a
                                    className={`${
                                        props.active == "shop"
                                            ? "font-bold"
                                            : ""
                                    }`}
                                >
                                    CUSTOM
                                </a>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </nav>
        </section>
    );
}
