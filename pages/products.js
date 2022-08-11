import Button from "../components/button";
import ProductCard from "../components/productCard";
import CartModal from "../components/cartModal";
import { useState, useEffect } from "react";
import debounce from "../utils/globals.js";
import * as db from "./api/database";

export async function getStaticProps() {
    const products = await db.getAllProductsData();

    return {
        props: {
            products,
        },
    };
}

export default function Products({ products }) {
    const [formData, updateFormData] = useState({});
    const [cart, updateCart] = useState({});
    const [cartKey, updateCartKey] = useState("");
    const [editCart, updateEditCart] = useState({});
    const [itemCosts, updateItemCosts] = useState({});
    const [cartModalState, updateCartModalState] = useState(false);
    const [cartIsUpdated, updateCartIsUpdated] = useState(true);
    const [innerHeight, updateInnerHeight] = useState(0);

    useEffect(() => {
        function detectInnerHeight() {
            updateInnerHeight(window.innerHeight);
        }
        detectInnerHeight();
        window.addEventListener("resize", debounce(detectInnerHeight, 1000));

        const storedCart = localStorage.getItem("cart");
        const storedItemCosts = localStorage.getItem("itemCosts");
        if (storedCart) {
            updateCart(JSON.parse(storedCart));
        }
        if (storedItemCosts) {
            updateItemCosts(JSON.parse(storedItemCosts));
        }
    }, []);

    useEffect(() => {
        if (Object.entries(cart).length) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        if (Object.entries(itemCosts).length) {
            localStorage.setItem("itemCosts", JSON.stringify(itemCosts));
        }
    }, [cart, itemCosts]);

    const handleInputChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const addToCart = (e) => {
        e.preventDefault();

        const productId = e.currentTarget.name;
        const itemQuantity = formData[productId];
        if (!validateCartItemQty(itemQuantity)) return false;
        const itemCost = e.currentTarget.dataset.price;

        clearInput(productId);

        const currentCartItem = cart[productId];
        if (currentCartItem) {
            updateCart({
                ...cart,
                [productId]:
                    parseFloat(currentCartItem) + parseFloat(itemQuantity),
            });
        } else {
            updateCart({
                ...cart,
                [productId]: formData[productId],
            });
        }

        updateCartKey(Math.random());
        updateEditCart({
            ...editCart,
            [productId]: (editCart[productId] ?? 0) + parseFloat(itemQuantity),
        });

        updateItemCosts({
            ...itemCosts,
            [productId]:
                (itemCosts[productId] ?? 0) +
                parseFloat(itemCost) * parseFloat(itemQuantity),
        });

        const updatedFormData = formData;
        delete updatedFormData[productId];

        updateFormData(updatedFormData);
        return true;
    };

    const clearInput = (productId) => {
        document.querySelector(
            `#productCard input[name="${productId}"]`
        ).value = "";
    };

    const openCartModal = () => {
        updateCartModalState("open");
        return true;
    };

    const closeCartModal = () => {
        if (cartModalState) {
            updateCartModalState("closed");
        }
    };

    const editCartItem = (e, productId, itemQuantity) => {
        if (e) {
            productId = e.currentTarget.name;
            itemQuantity = e.currentTarget.value;
        }

        updateEditCart({
            ...editCart,
            [productId]: parseFloat(itemQuantity),
        });
    };

    const updateCartFormEdit = (e) => {
        if (e) e.preventDefault();

        for (const key in editCart) {
            if (!validateCartItemQty(editCart[key])) return;
        }

        updateCart({
            ...cart,
            ...editCart,
        });

        updateCartKey(Math.random());

        let updatedCosts = {};
        for (const key in editCart) {
            updatedCosts[key] =
                editCart[key] *
                products.find(
                    (product) =>
                        product.product_id == key.replace("product_", "")
                ).product_price;
        }

        updateItemCosts({ ...itemCosts, ...updatedCosts });
        updateCartIsUpdated(true);
        return true;
    };

    const changeCartItemQty = (productId, qtyChange) => {
        const targetInput = document.querySelector(
            `#cartModal input[name="${productId}"]`
        );
        const currentQty = parseInt(targetInput.value);
        const newQty = currentQty + qtyChange;
        if (newQty < 1) {
            document
                .querySelector(`#cartModal [data-product_id="${productId}"]`)
                .classList.remove("hidden");
            if (
                document
                    .querySelector(
                        `#cartModal [data-product_id="${productId}"]`
                    )
                    .classList.contains("animate-closeX")
            ) {
                document
                    .querySelector(
                        `#cartModal [data-product_id="${productId}"]`
                    )
                    .classList.remove("animate-closeX");
            }
            document
                .querySelector(`#cartModal [data-product_id="${productId}"]`)
                .classList.add("animate-openX");
            return;
        }
        targetInput.value = newQty;

        editCartItem(null, productId, newQty);
        updateCartIsUpdated(false);
    };

    const validateCartItemQty = (qty) => {
        if (!(parseFloat(qty) == qty)) {
            alert("Please enter a valid quantity");
            return false;
        }
        if (qty <= 0) {
            alert("Quantity must be greater than 0");
            return false;
        }
        return true;
    };

    const removeItemFromCart = (productId) => {
        let updatedCart = { ...cart };
        delete updatedCart[productId];
        let updatedEditCart = { ...editCart };
        delete updatedEditCart[productId];

        updateCart(updatedCart);
        updateEditCart(updatedEditCart);
        updateItemCosts({ ...itemCosts, [productId]: 0 });
    };

    return (
        <div
            className={`font-source-sans-pro flex h-full flex-col`}
            style={{ height: `${innerHeight + "px" || "100vh"}` }}
        >
            <div className="flex flex-1 flex-col overflow-auto">
                <div>
                    <h1 className="font-bold text-5xl text-center pb-5 pt-10 md:pb-5">
                        PRODUCTS
                    </h1>
                </div>
                <div className="sticky w-full right-0 top-8 flex justify-center md:absolute md:justify-end md:px-16 md:py-2 z-10">
                        <div className="relative">
                            <Button
                                type="secondary"
                                img="/images/icons/shopping_cart.png"
                                clickHandler={openCartModal}
                            >
                                View Cart
                            </Button>
                            {Object.keys(cart).length ? (
                                <div
                                    className={`bg-default-900 text-default-100 font-bold text-center 
                            rounded-full absolute px-[0.4rem] h-5 top-0 right-0 
                            translate-x-2 -translate-y-2 animate-popIn ${
                                cartModalState === "open"
                                    ? "animate-popOut"
                                    : "animate-popIn"
                            }
                            `}
                                >
                                    <p className="-translate-y-0.5 animate-delayAppear">
                                        {Object.keys(cart).length}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <CartModal
                        cartModalState={cartModalState}
                        closeCartModal={closeCartModal}
                        editCartItem={editCartItem}
                        updateCartFormEdit={updateCartFormEdit}
                        changeCartItemQty={changeCartItemQty}
                        removeItemFromCart={removeItemFromCart}
                        cartIsUpdated={cartIsUpdated}
                        itemCosts={itemCosts}
                        cartKey={cartKey}
                        cart={cart}
                        products={products}
                    />
                <form>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5">
                        {products.map((product) => (
                            <ProductCard
                                addToCart={addToCart}
                                handleInputChange={handleInputChange}
                                type="number"
                                fieldStyle="productInput"
                                measured_per_text={product.measured_per_text}
                                price={product.product_price}
                                imgPath={product.product_img_path}
                                text={product.product_name}
                                product_description={
                                    product.product_description
                                }
                                placeholder="How many?"
                                name={"product_" + product.product_id}
                                key={product.product_id}
                            />
                        ))}
                    </div>
                </form>
            </div>
            <footer className="bg-default-100 flex flex-row justify-between items-center h-24 shadow-3xl">
                <p className="font-bold text-xl sm:text-2xl md:text-3xl px-4 sm:px-8 md:px-12">
                    Total Cost: $
                    {(Object.values(itemCosts).length
                        ? Object.values(itemCosts).reduce((a, b) => a + b)
                        : 0
                    ).toFixed(2)}
                </p>
                <div className="px-12">
                    <Button
                        type="primary"
                        img="/images/icons/shopping_cart.png"
                        link={true}
                        path="/checkout"
                        as="/checkout"
                        query={{
                            ...cart,
                            orderCost: (Object.values(itemCosts).length
                                ? Object.values(itemCosts).reduce(
                                      (a, b) => a + b
                                  )
                                : 0
                            ).toFixed(2),
                        }}
                    >
                        CHECKOUT
                    </Button>
                </div>
            </footer>
        </div>
    );
}
