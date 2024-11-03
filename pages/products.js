import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import CartModal from "../components/CartModal";
import MainHeader from "../components/MainHeader";
import ProductCard from "../components/ProductCard";
import * as db from "./api/database";
import { HIDE_PRODUCTS } from "./constants";

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
  const [isBusy, updateIsBusy] = useState(true);
  const initiallyRendered = useRef(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedItemCosts = localStorage.getItem("itemCosts");
    if (storedCart) {
      updateCart(JSON.parse(storedCart));
      updateFormData(JSON.parse(storedCart));
    }
    if (storedItemCosts) {
      updateItemCosts(JSON.parse(storedItemCosts));
    }
    updateIsBusy(false);
  }, []);

  useEffect(() => {
    if (initiallyRendered.current) {
      localStorage.setItem("cart", JSON.stringify(cart));
      let strippedItemCosts = {};
      for (const [key, value] of Object.entries(itemCosts)) {
        if (value) {
          strippedItemCosts[key] = value;
        }
      }
      localStorage.setItem("itemCosts", JSON.stringify(strippedItemCosts));
    }
    initiallyRendered.current = true;
  }, [cart, itemCosts]);

  const handleInputChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const decreaseProductQty = (e) => {
    const inputName = e.target.parentNode.querySelector("input").name;
    const inputValue = e.target.parentNode.querySelector("input").value.trim();
    e.target.parentNode.querySelector("input").value =
      parseInt(inputValue) > 1 ? parseInt(inputValue) - 1 : 0;

    updateFormData({
      ...formData,
      [inputName]: parseInt(inputValue) > 1 ? parseInt(inputValue) - 1 : 0,
    });
  };

  const increaseProductQty = (e) => {
    const inputName = e.target.parentNode.querySelector("input").name;
    const inputValue = e.target.parentNode.querySelector("input").value.trim();
    e.target.parentNode.querySelector("input").value = parseInt(inputValue)
      ? parseInt(inputValue) + 1
      : 1;

    updateFormData({
      ...formData,
      [inputName]: parseInt(inputValue) ? parseInt(inputValue) + 1 : 1,
    });
  };

  const addToCart = (e) => {
    e.preventDefault();
    const productId = e.currentTarget.name;
    const itemQuantity = formData[productId];
    if (!validateCartItemQty(itemQuantity, productId)) return false;
    if (itemQuantity < 1) {
      removeItemFromCart(productId);
      return true;
    }
    const itemCost = e.currentTarget.dataset.price;

    updateCart({
      ...cart,
      [productId]: parseFloat(itemQuantity),
    });

    updateCartKey(Math.random());
    updateEditCart({
      ...editCart,
      [productId]: parseFloat(itemQuantity),
    });
    updateItemCosts({
      ...itemCosts,
      [productId]: parseFloat(itemCost) * parseFloat(itemQuantity),
    });
    return true;
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
          (product) => product.product_id == key.replace("product_", ""),
        ).product_price;
    }

    updateItemCosts({ ...itemCosts, ...updatedCosts });
    updateCartIsUpdated(true);
    return true;
  };

  const changeCartItemQty = (productId, qtyChange) => {
    const targetInput = document.querySelector(
      `#cartModal input[name="${productId}"]`,
    );
    const currentQty = parseInt(targetInput.value);
    const newQty = currentQty + qtyChange;
    if (newQty < 1) {
      document
        .querySelector(`#cartModal [data-product_id="${productId}"]`)
        .classList.remove("hidden");
      if (
        document
          .querySelector(`#cartModal [data-product_id="${productId}"]`)
          .classList.contains("animate-closeX")
      ) {
        document
          .querySelector(`#cartModal [data-product_id="${productId}"]`)
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

  const validateCartItemQty = (qty, productId) => {
    if (!(parseFloat(qty) == qty)) {
      alert("Please enter a valid quantity");
      return false;
    }
    if (qty <= 0 && !formData[productId]) {
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

  const clearCart = () => {
    updateCart({});
    updateEditCart({});
    updateItemCosts({});
    return true;
  };

  return (
    <>
      <MainHeader active="christmas"></MainHeader>
      {HIDE_PRODUCTS ? (
        <section className="w-full flex flex-col text-center px-8 justify-center items-center gap-10 mt-16 bg-gray-100 py-10 sm:flex-row sm:px-0 sm:text-left">
          <div className="max-w-96 max-h-96 rounded-md overflow-hidden">
            <Image
              src="/images/product_images/christmas_products/santa_assortment.jpg"
              objectFit="cover"
              height="384"
              width="384"
            />
          </div>
          <div className="flex flex-col flex-end items-center gap-6 sm:items-start">
            <h2 className="text-default-900 text-5xl font-fjalla-one">
              CHRISTMAS COOKIES
            </h2>
            {/* <p className="text-slate-600 text-2xl"> */}
            {/*     Orders are now closed for the 2023 season */}
            {/* </p> */}
            <Link href="/products">
              <a className="flex bg-default-900 rounded-md font-bold text-xl text-default-100 px-5 py-4 w-fit">
                ORDER NOW
              </a>
            </Link>
          </div>
        </section>
      ) : (
        <div className={`font-source-sans-pro flex h-full flex-col`}>
          <div className="sticky w-full right-0 top-8 pt-4 flex justify-center lg:justify-end md:px-16 z-10">
            <div className="absolute">
              <Button
                type="secondary"
                img="/images/icons/shopping_cart.png"
                clickHandler={openCartModal}
              >
                View Cart
              </Button>
              {Object.keys(cart).length ? (
                <div
                  className={`bg-default-900 outline outline-2 text-default-100 font-bold text-center 
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
                clearCart={clearCart}
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col overflow-auto">
            <div>
              <h1 className="font-bold text-5xl text-center pb-2 px-16 pt-16 lg:pt-2">
                CHRISTMAS COOKIES
              </h1>
              <p className="text-lg px-4 text-center sm:mx-auto">
                *special requests can be made in the additional information box
                at checkout
              </p>
            </div>
            <form>
              <div className="grid grid-cols-1 pb-10 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 2xl:grid-cols-5 2xl:gap-x-1">
                {!isBusy &&
                  products.map((product) => (
                    <ProductCard
                      addToCart={addToCart}
                      handleInputChange={handleInputChange}
                      type="number"
                      fieldStyle="productInput"
                      measured_per_text={product.measured_per_text}
                      price={product.product_price}
                      imgPath={product.product_img_filename}
                      text={product.product_name}
                      product_description={product.product_description}
                      placeholder="How many?"
                      name={"product_" + product.product_id}
                      key={product.product_id}
                      productQty={cart["product_" + product.product_id]}
                      cart={cart}
                      increaseProductQty={increaseProductQty}
                      decreaseProductQty={decreaseProductQty}
                    />
                  ))}
              </div>
            </form>
          </div>
          <footer className="bg-default-100 sticky bottom-0 left-0 z-10 flex flex-row justify-between items-center h-24 shadow-3xl">
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
                    ? Object.values(itemCosts).reduce((a, b) => a + b)
                    : 0
                  ).toFixed(2),
                }}
              >
                CHECKOUT
              </Button>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
