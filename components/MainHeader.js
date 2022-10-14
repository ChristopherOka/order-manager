import Image from "next/image";
import MainNavbar from "./MainNavbar";
import Link from "next/link";

export default function MainHeader(props) {
    return (
        <div
            className="z-10 w-full bg-default-900 flex justify-center items-center"
            id="main-header"
        >
            <div className="pt-2 flex flex-col">
                <div className="flex justify-center py-4">
                    <Image
                        src="/images/misc/logo.png"
                        width="140"
                        height="140"
                    />
                </div>
                <MainNavbar active={props.active} />
            </div>
        </div>
    );
}
