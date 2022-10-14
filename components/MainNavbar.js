import Link from "next/link";
import { useState, useEffect } from "react";
import debounce from "../utils/globals.js";

export default function MainNavbar(props) {
    const [cookiesDropdownState, setCookiesDropdownState] = useState(null);
    const [mainHeaderWidth, setMainHeaderWidth] = useState(null);

    useEffect(() => {
        function detectMainHeaderWidth() {
            setMainHeaderWidth(document.getElementById("main-header").offsetWidth);
        }
        detectMainHeaderWidth();
        window.addEventListener("resize", debounce(detectMainHeaderWidth, 500));
        if (cookiesDropdownState) {
            document.addEventListener(
                "mousedown",
                (e) => {
                    if (!e.target.closest(".cookies-dropdown")) {
                        setCookiesDropdownState(false);
                    }
                },
                { once: true }
            );
        }
    }, [cookiesDropdownState]);

    return (
        <div
            className="bg-black flex justify-center w-full items-center"
            id="main-navbar"
            // style={{ width: `${mainHeaderWidth + "px" || "100vw"}` }}
        >
            <nav className="text-lg text-default-100 flex  justify-center items-center py-4">
                <div>
                    <Link href="/">
                        <a
                            className={`${
                                props.active == "home" ? "font-bold" : ""
                            } pr-5`}
                        >
                            HOME
                        </a>
                    </Link>
                </div>

                <div className="relative cookies-dropdown">
                    <a
                        className={`${
                            props.active == "christmas" || props.active == "custom"
                                ? "font-bold"
                                : ""
                        } pl-3 cursor-pointer`}
                        onClick={() => {
                            setCookiesDropdownState(!cookiesDropdownState);
                        }}
                    >
                        COOKIES
                    </a>
                    <div
                        className={`${
                            cookiesDropdownState
                                ? "animate-dropDown"
                                : cookiesDropdownState === false
                                ? "animate-dropUp"
                                : "hidden"
                        } origin-top-left absolute top-10 z-10 flex flex-col gap-2 bg-black rounded-b-md`}
                    >
                        <Link href="/products">
                            <a
                                className={`${
                                    props.active == "christmas"
                                        ? "font-bold"
                                        : ""
                                } px-3`}
                            >
                                CHRISTMAS
                            </a>
                        </Link>
                        <Link href="/custom_cookies">
                            <a
                                className={`${
                                    props.active == "custom" ? "font-bold" : ""
                                } px-3 pb-2`}
                            >
                                CUSTOM
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
        </div>
    );
}
