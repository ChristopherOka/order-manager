import Image from "next/image";
export default function UpdateCartDropdown(props) {

    return (
        <div className="flex gap-4 pt-4 justify-center w-72 relative">
            <div>
                <select
                    onChange={props.handleInputChange}
                    onFocus={props.handleFocus}
                    onBlur={props.handleBlur}
                    className={
                        `bg-default-900 rounded px-2 w-32 h-10 appearance-none bg-dropdown-arrow-white bg-no-repeat bg-right bg-origin-content border-none text-default-100 text-xl py-1 text-center placeholder:italic
                            focus:rounded-b-none transition-border duration-500 focus-visible:outline-none
                            ` +
                        " " +
                        (props.error ? "border-red" : "")
                    }
                    name={props.name}
                    defaultValue={props.productQty}
                >
                    {Array.from(Array(16).keys()).map((option, index) => {
                        return (
                            <option value={index} key={index}>
                                {index}
                            </option>
                        );
                    })}
                </select>
                <div
                    className={`text-center absolute w-32 rounded-b-md shadow-xl text-lg font-bold animate-slideOut -z-10 ${
                        props.inputFocus ? null : "hidden"
                    } `}
                >
                    {props.measured_per_text}s
                </div>
            </div>
            <button
                className="bg-default-900 rounded-md px-5 p-1 flex hover:bg-zinc-700 active:bg-zinc-600"
                onClick={props.addingToCart}
                name={props.name}
                data-price={props.price}
            >
                <span className="text-default-100 text-xl font-bold">+</span>
                <Image
                    className=""
                    src="/images/icons/shopping_cart.png"
                    width="28"
                    height="28"
                />
            </button>
        </div>
    );
}
