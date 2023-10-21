import Image from "next/image";
import { useRef, useState } from "react";
import BlurImage from "./BlurImage";
import UpdateCartDropdown from "./UpdateCartDropdown";

export default function ProductCard(props) {
    const [inputFocus, setInputFocus] = useState(false);
    const [flipped, setFlipped] = useState(false);
    const [toggleAddedToCart, setToggleAddedToCart] = useState("hidden");
    const [unconfirmedQty, setUnconfirmedQty] = useState(false);
    const clickedCount = useRef(0);
    const handleFocus = (e) => {
        setInputFocus(true);
    };

    const handleBlur = (e) => {
        setInputFocus(false);
    };

    const flipCard = (e, flipState) => {
        e.preventDefault();
        if (!props.product_description) return;
        if (flipState === "toggle") {
            flipped === "flipped"
                ? setFlipped("unflipped")
                : setFlipped("flipped");
        } else if (flipState && flipped) {
            setFlipped(flipState);
            return;
        }
    };

    const addingToCart = (e) => {
        e.preventDefault();
        if (props.addToCart(e)) {
            setToggleAddedToCart(!toggleAddedToCart);
            clickedCount.current = clickedCount.current + 1;
            setUnconfirmedQty(false);
        }
    };

    const preHandleInputChange = (e) => {
        e.preventDefault();
        setUnconfirmedQty(true);
        props.handleInputChange(e);
    };

    const increaseProductQty = (e) => {
        e.preventDefault();
        setUnconfirmedQty(true);
        props.increaseProductQty(e);
    };

    const decreaseProductQty = (e) => {
        e.preventDefault();
        setUnconfirmedQty(true);
        props.decreaseProductQty(e);
    };

    return (
        <div id="productCard" className="my-6 mx-auto cursor-pointer">
            <div
                className="relative"
                onMouseLeave={(e) => flipCard(e, "unflipped")}
                onClick={(e) => flipCard(e, "toggle")}
            >
                <div
                    className={`group ${
                        flipped == "flipped"
                            ? "animate-frontTileFlip"
                            : flipped == "unflipped"
                            ? "animate-backTileFlip animation-delay-400"
                            : null
                    }`}
                >
                    <div className="bg-default-900 relative rounded-t-md py-3 w-72 flex flex-col text-default-100 text-center">
                        <h3 className="text-xl font-bold">{props.text}</h3>
                        <p className="italic text-lg">
                            ${props.price} per{" "}
                            {props.measured_per_text.toLowerCase()}{" "}
                        </p>
                    </div>
                    {props.imgPath ? (
                        <BlurImage alt={props.text} imgPath={props.imgPath} />
                    ) : null}
                    {props.product_description ? (
                        <div className="absolute bottom-0 right-0">
                            <div className="bg-default-900 relative rounded-br-md rounded-tl-md flex items-center gap-2 px-4 py-1">
                                <div className="absolute -left-[28.9px] bottom-0 w-0 h-0 border-l-[1.9rem] border-l-transparent border-r-[1.9rem] border-r-transparent border-b-[34px] border-b-default-900"></div>
                                <h4 className="text-default-100 text-xl">
                                    &nbsp; Click for Details
                                </h4>
                                <div className="rotate-180 flex">
                                    <Image
                                        src="/images/icons/back_arrow.svg"
                                        width="25"
                                        height="25"
                                    />
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
                <div
                    className={`group absolute top-0 ${
                        flipped == "flipped"
                            ? "animate-backTileFlip animation-delay-400"
                            : flipped == "unflipped"
                            ? "animate-frontTileFlip"
                            : "hidden"
                    }`}
                >
                    <div className="bg-default-900 rounded-t-md py-3 w-72 flex flex-col text-default-100 text-center">
                        <h3 className="text-xl font-bold">{props.text}</h3>
                        <p className="italic">
                            ${props.price} per{" "}
                            {props.measured_per_text.toLowerCase()}{" "}
                        </p>
                    </div>
                    <div className="rounded-b-md bg-default-100 relative w-72 h-72 shadow-2xl group-hover:opacity-75 duration-300 ease-in-out">
                        <div
                            className="px-6 py-3"
                            dangerouslySetInnerHTML={{
                                __html: props.product_description,
                            }}
                        ></div>
                    </div>
                </div>
            </div>

            <UpdateCartDropdown
                handleInputChange={preHandleInputChange}
                error={props.error}
                name={props.name}
                measured_per_text={props.measured_per_text}
                price={props.price}
                inputFocus={inputFocus}
                handleFocus={handleFocus}
                handleBlur={handleBlur}
                addingToCart={addingToCart}
                productQty={props.productQty}
                unconfirmedQty={unconfirmedQty}
                increaseProductQty={increaseProductQty}
                decreaseProductQty={decreaseProductQty}
            ></UpdateCartDropdown>
            <div className="text-lg font-bold text-center text-green-500 mt-2 w-1/2 float-right pr-5 h-2">
                {toggleAddedToCart !== "hidden" ? (
                    <div
                        key={toggleAddedToCart}
                        className="animate-fadeInOut -"
                    >
                        {clickedCount.current > 1
                            ? "Updated Cart!"
                            : "Added to cart!"}
                    </div>
                ) : null}
            </div>
            {props.productQty > 20 && (
                <div className="pt-10 -mb-10 text-yellow-600 font-bold text-center max-w-[250px] mx-auto leading-5">
                    Orders above 20 dozen need aditional lead time. Please leave
                    an explanation in the &quot;additional information&quot; section at
                    checkout.
                </div>
            )}
        </div>
    );
}
