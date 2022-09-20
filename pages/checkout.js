import FormField from "../components/FormField";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import * as db from "./api/database";
import Button from "../components/Button";
import CheckoutProductCard from "../components/CheckoutProductCard";
import MainHeader from "../components/MainHeader";
import debounce from "../utils/globals.js";

export async function getStaticProps() {
    const products = await db.getAllProductsData();

    return {
        props: {
            products,
        },
    };
}

async function sendFormData(data) {
    const customer_uid = uuidv4();
    const order_uid = uuidv4();
    data.customer_uid = customer_uid;
    data.order_uid = order_uid;
    data.delivery_date = new Date(data.delivery_date)
        .toISOString()
        .slice(0, -1);

    data.order_items = [];
    for (const item in data.order_data) {
        data.order_items.push({
            order_uid,
            product_id: item.replace("product_", ""),
            quantity: data.order_data[item],
            order_item_uid: uuidv4(),
        });
    }

    delete data.order_data;
    if (!(await db.insertCustomerAndOrder(data))) {
        alert("Order not processed. Please try again.");
        return false;
    }
    return true;
}

export default function Checkout({ products }) {
    const [formData, updateFormData] = useState({});
    const [emptyFields, updateEmptyFields] = useState({});
    const [cart, updateCart] = useState({});
    const [itemCosts, updateItemCosts] = useState({});
    const [innerHeight, updateInnerHeight] = useState(0);
    const [cookieFormData, updateCookieFormData] = useState({});
    const initiallyRendered = useRef(false);
    const router = useRouter();

    useEffect(() => {
        const receivedCart = JSON.parse(localStorage.getItem("cart") || "{}");
        const receiveditemCosts = JSON.parse(
            localStorage.getItem("itemCosts") || "{}"
        );
        if (receivedCart) {
            updateCart(receivedCart);
        }
        if (receiveditemCosts) {
            updateItemCosts(receiveditemCosts);
        }
        function detectInnerHeight() {
            const headerHeight =
                document.querySelector("#main-header").offsetHeight;
            updateInnerHeight(window.innerHeight - headerHeight);
        }
        detectInnerHeight();
        window.addEventListener("resize", debounce(detectInnerHeight, 500));
    }, []);

    const handleFocus = (e) => {
        updateEmptyFields({
            ...emptyFields,
            [e.target.name]: false,
        });
    };

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const orderCost = Object.values(itemCosts).reduce((a, b) => a + b, 0);
        if (orderCost == "0.00" || !orderCost) {
            alert("No items are in your order!");
            return true;
        }
        if (!validateForm(formData)) {
            alert("Please fill in all required fields");
            return true;
        }

        if (
            formData["delivery_date"] == "Other" &&
            formData["alternative_delivery_date"]
        ) {
            formData["delivery_date"] = formData["alternative_delivery_date"];
            delete formData["alternative_delivery_date"];
        }

        if (formData["city"] == "Other" && formData["alternative_city"]) {
            formData["city"] = formData["alternative_city"];
            delete formData["alternative_city"];
        }

        if (
            !(await sendFormData({
                ...formData,
                order_cost: orderCost,
                order_data: cart,
            }))
        )
            return false;

        const hasAdditionalInformation = !!formData.additional_information;

        let email_addresses = [
            { address: formData.email, name: formData.name },
        ];
        if (hasAdditionalInformation) {
            email_addresses = [];
        }
        await fetch("/api/sendOrderEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                order_details: formData,
                order_cost: orderCost,
                cart,
                products: products,
                email_addresses,
            }),
        });

        await router.push(
            {
                pathname: "/thank_you",
                query: { hasAdditionalInformation },
            },
            "/thank_you"
        );
        localStorage.setItem("cart", "");
        localStorage.setItem("itemCosts", "");
        return true;
    };

    const validateForm = () => {
        const requiredFields = [
            "customer_name",
            "email",
            "phone",
            "address",
            "city",
            "delivery_date",
            "payment_type",
        ];
        let isValid = true;
        let newEmptyFields = {};

        for (const field of requiredFields) {
            if (!formData[field]) {
                newEmptyFields = { ...newEmptyFields, [field]: true };
                isValid = false;
            }
            if (
                field === "delivery_date" &&
                formData["delivery_date"] === "Other" &&
                formData["alternative_delivery_date"] === ""
            ) {
                newEmptyFields = {
                    ...newEmptyFields,
                    alternative_delivery_date: true,
                };
                isValid = false;
            }
            if (
                field === "city" &&
                formData["city"] === "Other" &&
                formData["alternative_city"] === ""
            ) {
                newEmptyFields = {
                    ...newEmptyFields,
                    alternative_city: true,
                };
                isValid = false;
            }
        }
        updateEmptyFields({ ...emptyFields, ...newEmptyFields });

        return isValid;
    };

    const handleDeliveryDateChange = (e) => {
        const value = e.target.value;
        if (value == "Other") {
            document
                .getElementById("alternative_delivery_date")
                .classList.remove("hidden");
        } else {
            document
                .getElementById("alternative_delivery_date")
                .classList.add("hidden");
        }
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        if (value == "Other") {
            document
                .getElementById("alternative_city")
                .classList.remove("hidden");
        } else {
            document.getElementById("alternative_city").classList.add("hidden");
        }
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    useEffect(() => {
        if (initiallyRendered.current) {
            localStorage.setItem("cart", JSON.stringify(cart));
            localStorage.setItem("itemCosts", JSON.stringify(itemCosts));
        }
        initiallyRendered.current = true;
    }, [cart, itemCosts]);

    const handleCookieSelectChange = (e) => {
        updateCookieFormData({
            ...cookieFormData,
            [e.target.name]: e.target.value.trim(),
        });
    };

    const updateCartItems = (e) => {
        e.preventDefault();
        const productId = e.currentTarget.name;
        const itemQuantity = cookieFormData[productId];
        if (itemQuantity < 1) {
            removeItemFromCart(productId);
            return true;
        }
        const itemCost = e.currentTarget.dataset.price;
        debugger;
        updateCart({
            ...cart,
            [productId]: parseFloat(itemQuantity),
        });
        updateItemCosts({
            ...itemCosts,
            [productId]: parseFloat(itemCost) * parseFloat(itemQuantity),
        });
        return true;
    };

    const removeItemFromCart = (productId) => {
        let updatedCart = { ...cart };
        delete updatedCart[productId];

        updateCart(updatedCart);
        updateItemCosts({ ...itemCosts, [productId]: 0 });
    };

    const personalFields = [
        {
            type: "text",
            name: "customer_name",
            text: "Name",
            fieldStyle: "input",
            required: true,
        },
        {
            type: "text",
            name: "email",
            text: "Email",
            fieldStyle: "input",
            required: true,
        },
        {
            type: "number",
            name: "phone",
            text: "Phone",
            fieldStyle: "input",
            required: true,
        },
        {
            name: "city",
            text: "City",
            fieldStyle: "select",
            options: [
                {
                    value: "Mississauga",
                    text: "Mississauga",
                },
                {
                    value: "Etobicoke",
                    text: "Etobicoke",
                },
                {
                    value: "Other",
                    text: "Other",
                },
            ],
            required: true,
            customChangeHandler: handleCityChange,
        },
        {
            name: "alternative_city",
            text: "Alternative City",
            fieldStyle: "input",
            type: "text",
            hidden: true,
            required: true,
            description:
                "Local deliveries only, but some exceptions can be made. Please leave a note in additional information at to why!",
        },
        {
            type: "text",
            name: "address",
            text: "Street Address",
            fieldStyle: "input",
            required: true,
        },
    ];

    const orderFields = [
        {
            name: "payment_type",
            text: "Payment Type",
            fieldStyle: "select",
            options: [
                {
                    value: "E-Transfer",
                    text: "E-Transfer",
                },
                {
                    value: "Cash",
                    text: "Cash On Delivery",
                },
            ],
            required: true,
        },
        {
            name: "delivery_date",
            text: "Delivery Date",
            fieldStyle: "select",
            options: [
                {
                    value: "2022-12-01",
                    text: "December 1st",
                    disabled: new Date() > new Date("2022-12-01"),
                },
                {
                    value: "2022-12-08",
                    text: "December 8th",
                    disabled: new Date() > new Date("2022-12-08"),
                },
                {
                    value: "2022-12-15",
                    text: "December 15th",
                    disabled: new Date() > new Date("2022-12-15"),
                },
                {
                    value: "2022-12-22",
                    text: "December 22nd",
                    disabled: new Date() > new Date("2022-12-22"),
                },
                {
                    value: "2022-12-29",
                    text: "December 29th",
                    disabled: new Date() > new Date("2022-12-29"),
                },
                {
                    value: "Other",
                    text: "Other",
                },
            ],
            required: true,
            customChangeHandler: handleDeliveryDateChange,
        },
        {
            name: "alternative_delivery_date",
            text: "Alternative Delivery Date",
            fieldStyle: "input",
            type: "date",
            min: "2022-11-01",
            max: "2023-01-31",
            hidden: true,
            required: true,
            description:
                "These are my set delivery days, however if you require a differen day, please leave a note in additional information and I'll see what I can do!",
        },
        {
            type: "text",
            name: "additional_information",
            text: "Additional Information",
            fieldStyle: "textarea",
            required: false,
        },
    ];

    return (
        <>
            <MainHeader active="christmas" />
            <div
                className="overflow-auto"
                style={{ height: `${innerHeight + "px" || "100vh"}` }}
            >
                <div className="w-full pt-10 pb-8 flex flex-col md:flex-row relative justify-center md:justify-start">
                    <h1 className="text-5xl text-default-900 font-bold text-center w-full relative md:absolute">
                        CHECKOUT
                    </h1>
                    <div className="z-10 max-w-fit pt-6 px-10 md:pr-0 md:py-0 self-center">
                        <Button
                            type="secondary"
                            img="/images/icons/back_arrow.svg"
                            link="true"
                            path="/products"
                            as="/products"
                        >
                            GO BACK
                        </Button>
                    </div>
                </div>

                <form className="flex flex-col gap-8 mx-8 md:grid md:grid-cols-4 md:gap-4 lg:mx-12 xl:mx-20">
                    <div className="md:mr-10">
                        <h2 className="text-3xl font-bold">Personal Details</h2>
                        {personalFields.map((field, index) => {
                            return (
                                <FormField
                                    handleFocus={handleFocus}
                                    onChange={handleChange}
                                    customChangeHandler={
                                        field.customChangeHandler
                                    }
                                    error={emptyFields[field.name]}
                                    type={field.type}
                                    name={field.name}
                                    text={field.text}
                                    fieldStyle={field.fieldStyle}
                                    options={field.options}
                                    required={field.required}
                                    hidden={field.hidden}
                                    description={field.description}
                                    key={index}
                                />
                            );
                        })}
                        <p className="italic text-lg text-slate-600 mt-3">
                            <span className="text-red-500 text-xl">*</span>{" "}
                            required
                        </p>
                    </div>
                    <div className="md:mr-10">
                        <h2 className="text-3xl font-bold">Order Details</h2>
                        {orderFields.map((field, index) => {
                            return (
                                <FormField
                                    handleFocus={handleFocus}
                                    onChange={handleChange}
                                    customChangeHandler={
                                        field.customChangeHandler
                                    }
                                    hidden={field.hidden}
                                    error={emptyFields[field.name]}
                                    type={field.type}
                                    name={field.name}
                                    text={field.text}
                                    fieldStyle={field.fieldStyle}
                                    options={field.options}
                                    required={field.required}
                                    description={field.description}
                                    min={field.min}
                                    max={field.max}
                                    key={index}
                                />
                            );
                        })}
                    </div>
                    <div className="bg-default-100 rounded-md shadow-3xl h-full col-span-2 md:ml-10">
                        <div className="flex flex-wrap justify-between items-end px-10 py-5">
                            <h2 className="text-3xl font-bold">Your Order</h2>
                            <h3 className="text-default-900 text-xl">
                                Total Cost: $
                                {(Object.values(itemCosts).length
                                    ? Object.values(itemCosts).reduce(
                                          (a, b) => a + b
                                      )
                                    : 0
                                ).toFixed(2)}
                            </h3>
                        </div>
                        <div className="flex flex-row flex-wrap gap-6 max-h-[37rem] px-10 pb-5 overflow-y-auto overflow-x-hidden justify-center">
                            {Object.keys(cart)
                                .sort((a, b) => {
                                    return (
                                        a.match(/product_([0-9]+)/)[1] -
                                        b.match(/product_([0-9]+)/)[1]
                                    );
                                })
                                .map((item) => {
                                    const product = products.find(
                                        (product) =>
                                            product.product_id ==
                                            item.replace("product_", "")
                                    );
                                    return (
                                        <CheckoutProductCard
                                            productId={item}
                                            productQty={cart[item]}
                                            imgPath={
                                                product.product_img_filename
                                            }
                                            productName={product.product_name}
                                            productPrice={product.product_price}
                                            totalCost={
                                                parseFloat(
                                                    product.product_price
                                                ) * parseFloat(cart[item])
                                            }
                                            addToCart={updateCartItems}
                                            key={item}
                                            cart={cart}
                                            handleChange={
                                                handleCookieSelectChange
                                            }
                                        />
                                    );
                                })}
                        </div>
                    </div>
                </form>
                <div className="flex my-8 justify-center md:justify-end md:px-20 w-full md:mt-4">
                    <Button
                        type="primary"
                        img="/images/icons/cookie.png"
                        clickHandler={handlePlaceOrder}
                    >
                        PLACE ORDER
                    </Button>
                </div>
            </div>
        </>
    );
}
