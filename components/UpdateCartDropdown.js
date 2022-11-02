export default function UpdateCartDropdown(props) {
    return (
        <div className={`${props.isCheckoutCard ? 'justify-center' : 'justify-between'} flex pt-4 w-72 relative`}>
            <div>
                <select
                    onChange={props.handleInputChange}
                    onFocus={props.handleFocus}
                    onBlur={props.handleBlur}
                    className={
                        `bg-default-900 rounded px-3 w-28 h-10 appearance-none bg-dropdown-arrow-white bg-no-repeat bg-right bg-origin-content border-none text-default-100 text-xl py-1 text-center placeholder:italic
                            focus:rounded-b-none transition-border duration-500 focus-visible:outline-none
                            ` +
                        " " +
                        (props.error ? "border-red" : "")
                    }
                    name={props.name}
                    defaultValue={props.productQty}
                >
                    {Array.from(Array(21).keys()).map((option, index) => {
                        return (
                            <option value={index} key={index}>
                                {index}
                            </option>
                        );
                    })}
                </select>
                <div
                    className={`text-center absolute w-28 rounded-b-md shadow-xl text-lg font-bold animate-slideOut -z-10 ${
                        props.inputFocus ? null : "hidden"
                    } `}
                >
                    {props.measured_per_text}s
                </div>
            </div>
            <button
                className={`${
                    props.unconfirmedQty
                        ? "bg-yellow-400 hover:bg-yellow-300 active:bg-yellow-300 animate-buttonAttention"
                        : "bg-default-900 hover:bg-zinc-700 active:bg-zinc-600"
                } rounded-md px-4 p-1 `}
                onClick={props.addingToCart}
                name={props.name}
                data-price={props.price}
            >
                <span
                    className={`${
                        props.unconfirmedQty
                            ? "text-default-900 "
                            : "text-default-100"
                    } text-xl font-bold`}
                >
                    {props.isCheckoutCard ? 'UPDATE' : '+ ADD TO CART'}
                </span>
            </button>
        </div>
    );
}
