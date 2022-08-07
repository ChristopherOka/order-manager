import Link from "next/link";

export default function Navbar(props) {
    return (
        <div className="w-full absolute bottom-0">
            <div className="flex items-center justify-around text-xl font-bold my-5 bg-default-900 text-default-100 p-4 rounded-full mx-6 md:mx-32 lg:mx-56 xl:mx-72 2xl:mx-96">
                <div className="relative">
                    <Link href="/home">
                        <a className={props.homeActive ? "text-pink-300" : ""}>
                            HOME
                        </a>
                    </Link>
                    {props.homeActive ? (
                        <div className="absolute -bottom-4 left-0 bg-pink-300 w-full h-1"></div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="relative">
                    <Link href="/orders">
                        <a>ORDERS</a>
                    </Link>
                    {props.ordersActive ? (
                        <div className="absolute -bottom-4 left-0 bg-pink-300 w-full h-1"></div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="relative">
                    <Link href="/finances">
                        <a>FINANCES</a>
                    </Link>
                    {props.financesActive ? (
                        <div className="absolute -bottom-4 left-0 bg-pink-300 w-full h-1"></div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </div>
    );
}
