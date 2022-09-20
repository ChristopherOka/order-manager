import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { showThrobber, hideThrobber } from "../utils/globals.js";

export default function Navbar(props) {
    const router = useRouter();
    const rendered = useRef(false);
    useEffect(() => {
        if (rendered.current) return;
        router.prefetch("/");
        router.prefetch("/orders");
        router.prefetch("/order_dashboard");
        router.prefetch("/finances");
        rendered.current = true;
    }, []);

    const navigate = (path) => {
        router.events.on("routeChangeStart", showThrobber);
        router.events.on("routeChangeComplete", hideThrobber);
        router.push(path);
    };

    return (
        <div className="w-full absolute bottom-0">
            <div className="flex items-center justify-around text-md font-bold mb-5 bg-default-900 text-default-100 p-3 rounded mx-2 text-center md:rounded-full md:text-left md:text-xl md:mx-32 lg:mx-56 xl:mx-72 2xl:mx-96">
                <div className="relative cursor-pointer">
                    <a
                        className={
                            props.activeTab == "home" ? "text-pink-300" : ""
                        }
                        onClick={() => {
                            navigate("/home");
                        }}
                    >
                        HOME
                    </a>
                    {props.activeTab == "home" ? (
                        <div className="absolute -bottom-3 left-0 bg-pink-300 w-full h-1"></div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="relative cursor-pointer">
                    <a
                        className={
                            props.activeTab == "order_dashboard"
                                ? "text-pink-300"
                                : ""
                        }
                        onClick={() => {
                            navigate("/order_dashboard");
                        }}
                    >
                        ORDER DASHBOARD
                    </a>
                    {props.activeTab == "order_dashboard" ? (
                        <div className="absolute -bottom-3 left-0 bg-pink-300 w-full h-1"></div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="relative cursor-pointer">
                    <a
                        className={
                            props.activeTab == "orders" ? "text-pink-300" : ""
                        }
                        onClick={() => {
                            navigate("/orders");
                        }}
                    >
                        ALL ORDERS
                    </a>
                    {props.activeTab == "orders" ? (
                        <div className="absolute -bottom-3 left-0 bg-pink-300 w-full h-1"></div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="relative cursor-pointer">
                    <a
                        className={
                            props.activeTab == "finances" ? "text-pink-300" : ""
                        }
                        onClick={() => {
                            navigate("/finances");
                        }}
                    >
                        FINANCES
                    </a>
                    {props.activeTab == "finances" ? (
                        <div className="absolute -bottom-3 left-0 bg-pink-300 w-full h-1"></div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
