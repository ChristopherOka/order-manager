import Image from "next/image";

export default function CartModalProduct(props) {
    const closeConfirmDelete = () => {
        document
            .querySelector(`#cartModal [data-product_id="${props.productId}"]`)
            .classList.add("animate-closeX");
        document
            .querySelector(`#cartModal [data-product_id="${props.productId}"]`)
            .classList.remove("animate-openX");
    };

    return (
        <div className="flex px-4 py-2 justify-between gap-4 relative">
            <p className="text-lg font-bold">
                {
                    props.products.find(
                        (product) =>
                            product.product_id ==
                            props.productId.replace("product_", "")
                    ).product_name
                }
            </p>
            <div className="flex">
                <button
                    className="bg-default-900 text-xl text-default-100 font-bold rounded-l-md px-3 h-7"
                    name={props.productId}
                    onClick={() => {
                        props.changeCartItemQty(props.productId, -1);
                    }}
                >
                    -
                </button>
                <input
                    className="bg-default-900 text-default-100 text-md text-center w-8  h-7 border-x"
                    name={props.productId}
                    inputMode="numeric"
                    maxLength="3"
                    defaultValue={props.cart[props.productId]}
                    onChange={props.editCartItem}
                    autoComplete="off"
                />
                <button
                    className="bg-default-900 text-xl text-default-100 font-bold rounded-r-md px-3 h-7"
                    onClick={() => {
                        props.changeCartItemQty(props.productId, 1);
                    }}
                >
                    +
                </button>
            </div>
            <div
                className={`bg-default-900 rounded-md text-lg text-default-100 absolute flex items-center hidden origin-right`}
                data-product_id={props.productId}
            >
                <p className="px-4 w-72">Remove item from cart?</p>
                <button
                    className="px-2"
                    onClick={() => props.removeItemFromCart(props.productId)}
                >
                    <Image
                        src="/images/icons/green_check.png"
                        width="17"
                        height="14"
                    />
                </button>
                <button className="px-2" onClick={closeConfirmDelete}>
                    <Image
                        src="/images/icons/red_x.png"
                        width="14"
                        height="14"
                    />
                </button>
            </div>
        </div>
    );
}
