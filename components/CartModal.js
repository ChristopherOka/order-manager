import Button from "./Button";
import Image from "next/image";
import CartModalProduct from "./CartModalProduct";
import Popover from "./Popover";

export default function CartModal(props) {
    return (
        <div
            id="cartModal"
            className={`
            bg-default-100 absolute right-0 top-0 rounded-md shadow-3xl 
             mx-5 my-10 max-w-96 sm:w-96 h-[30rem] origin-top-right z-20 sm:mx-16
            ${
                props.cartModalState == "open"
                    ? "animate-modalAppear"
                    : props.cartModalState == "closed"
                    ? "animate-modalDisappear"
                    : "hidden"
            }
            `}
        >
            <div className="text-xl font-bold flex flex-col pb-2 pt-4 relative w-full align-start items-center sm:pb-0 sm:text-3xl sm:h-20">
                <div className="flex">
                    <div>CART</div>
                    <div className="pt-px px-1 w-[24px] h-[22px] sm:w-[34px] sm:h-[28px]">
                        <Image
                            src="/images/icons/shopping_cart_dark.png"
                            width="24"
                            height="22"
                        />
                    </div>
                </div>
                <p className="text-base text-slate-600 font-normal -m-1 sm:text-lg">
                    Total Cost: $
                    {(Object.values(props.itemCosts).length
                        ? Object.values(props.itemCosts).reduce((a, b) => a + b)
                        : 0
                    ).toFixed(2)}
                </p>
                <button
                    className="absolute right-5 sm:right-10 top-4 h-6 w-6"
                    onClick={props.closeCartModal}
                >
                    <div className="absolute bg-slate-600 rotate-45 w-6 h-0.5"></div>
                    <div className="absolute bg-slate-600 -rotate-45 w-6 h-0.5"></div>
                </button>
            </div>
            <div
                className=" overflow-auto w-full h-[21.5rem] sm:pt-4"
                key={props.cartKey}
            >
                {Object.keys(props.cart).length ? (
                    Object.keys(props.cart).map((productId) => {
                        return (
                            <div key={productId}>
                                <CartModalProduct
                                    products={props.products}
                                    productId={productId}
                                    changeCartItemQty={props.changeCartItemQty}
                                    removeItemFromCart={
                                        props.removeItemFromCart
                                    }
                                    cart={props.cart}
                                    editCartItem={props.editCartItem}
                                />
                            </div>
                        );
                    })
                ) : (
                    <div className="text-base px-4 py-4 text-center sm:text-xl">
                        Your cart is empty
                    </div>
                )}
            </div>
            <div className="shadow-top w-full h-14 flex justify-end items-center">
                {props.cartIsUpdated ? (
                    Object.keys(props.cart).length ? (
                        <Button
                            type="primary-md"
                            img="/images/icons/shopping_cart.png"
                            link="true"
                            path="/checkout"
                            as="/checkout"
                            query={{
                                ...props.cart,
                                orderCost: (Object.values(props.itemCosts)
                                    .length
                                    ? Object.values(props.itemCosts).reduce(
                                          (a, b) => a + b
                                      )
                                    : 0
                                ).toFixed(2),
                            }}
                        >
                            CHECKOUT
                        </Button>
                    ) : null
                ) : (
                    <>
                        <Popover content="Unsaved changes to your cart">
                            <div className="px-1 flex -m-2 animate-fadeIn">
                                <Image
                                    src="/images/icons/orange_exclamation.png"
                                    width="25"
                                    height="25"
                                />
                            </div>
                        </Popover>
                        <Button
                            type="primary-md"
                            img="/images/icons/refresh.png"
                            clickHandler={props.updateCartFormEdit}
                        >
                            UPDATE CART
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
