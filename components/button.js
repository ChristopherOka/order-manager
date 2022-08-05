import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Button(props) {
    const [disabled, updateDisabled] = useState(false);

    const handleClick = async (e) => {
        e.preventDefault();
        updateDisabled(true);
        if (props.clickHandler) {
            await props.clickHandler(e);
        }
        updateDisabled(false);
    };

    let buttonStyle;
    switch (props.type) {
        case "primary":
            buttonStyle =
                "bg-default-900 text-default-100 text-xl px-7 h-14 gap-4";
            break;
        case "secondary":
            buttonStyle =
                "bg-default-100 text-default-900 shadow-3xl text-xl px-7 h-14 gap-4";
            break;
        case "primary-md":
            buttonStyle =
                "bg-default-900 text-default-100 text-md px-6 h-10 gap-3 my-2 mx-5 float-right";
            break;
        case "tertiary":
            break;
        default:
            buttonStyle = "";
    }
    return (
        <>
            {props.link ? (
                <Link
                    href={{
                        pathname: props.path,
                        query: props.query,
                    }}
                    as={props.as}
                >
                    <a
                        className={`tracking-widest rounded-md flex items-center font-bold ${buttonStyle} ${
                            disabled ? "opacity-50 cursor-default" : ""
                        }`}
                    >
                        <Image
                            className={
                                props.type == "secondary" ? "invert" : null
                            }
                            src={props.img}
                            width={`${
                                props.type == "primary-md" ? "24" : "28"
                            }`}
                            height={`${
                                props.type == "primary-md" ? "24" : "28"
                            }`}
                        />
                        {props.children}
                    </a>
                </Link>
            ) : (
                <button
                    className={`tracking-widest rounded-md flex items-center font-bold ${buttonStyle} ${
                        disabled ? "opacity-50 cursor-default" : ""
                    }`}
                    onClick={disabled ? null : handleClick}
                >
                    <Image
                        className={props.type == "secondary" ? "invert" : null}
                        src={props.img}
                        width={`${props.type == "primary-md" ? "24" : "28"}`}
                        height={`${props.type == "primary-md" ? "24" : "28"}`}
                    />
                    {props.children}
                </button>
            )}
        </>
    );
}
