import FormField from "../components/formField";
import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import * as db from "./api/database";
import Button from "../components/button";
import CheckoutProductCard from "../components/checkoutProductCard";

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
    const router = useRouter();

    const data = router.query;
    console.log(data);
    const { itemCosts, ...orderData } = data;
    let orderCost = 0;
    if (Object.keys(orderData).length) {
        orderCost = Object.values(itemCosts).reduce((a, b) => a + b, 0);
    }

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
        if (orderCost == "0.00" || !orderCost) {
            alert("No items are in your order!");
            return;
        }
        if (!validateForm(formData)) {
            alert("Please fill in all required fields");
            return;
        }

        if (
            formData["delivery_date"] == "Other" &&
            formData["alternative_delivery_date"]
        ) {
            formData["delivery_date"] = formData["alternative_delivery_date"];
            delete formData["alternative_delivery_date"];
        }

        if (
            !(await sendFormData({
                ...formData,
                order_cost: orderCost,
                order_data: orderData,
            }))
        ) {
            return false;
        } else {
            await router.push("/thank_you");
            return true;
        }
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
                    value: "Burlington",
                    text: "Burlington",
                },
            ],
            required: true,
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
                    text: "Cash",
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
                },
                {
                    value: "2022-12-08",
                    text: "December 8th",
                },
                {
                    value: "2022-12-15",
                    text: "December 15th",
                },
                {
                    value: "2022-12-22",
                    text: "December 22nd",
                },
                {
                    value: "2022-12-29",
                    text: "December 29th",
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
                "Please provide a reason in additional information for the alternative delivery date!",
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
            <div className="w-full pt-10 pb-16 flex relative">
                <div className="z-10 pl-10">
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

                <h1 className="text-5xl text-default-900 font-bold text-center w-full absolute">
                    CHECKOUT
                </h1>
            </div>

            <form className="flex flex-col gap-8 mx-8 md:grid md:grid-cols-4 md:gap-4 lg:mx-12 xl:mx-20">
                <div className="md:mr-10">
                    <h2 className="text-3xl font-bold">Personal Details</h2>
                    {personalFields.map((field, index) => {
                        return (
                            <FormField
                                handleFocus={handleFocus}
                                onChange={handleChange}
                                error={emptyFields[field.name]}
                                type={field.type}
                                name={field.name}
                                text={field.text}
                                fieldStyle={field.fieldStyle}
                                options={field.options}
                                required={field.required}
                                description={field.description}
                                key={index}
                            />
                        );
                    })}
                    <p className="italic text-lg text-slate-600 mt-3">
                        <span className="text-red-500 text-xl">*</span> required
                    </p>
                </div>
                <div className="md:mr-10">
                    <h2 className="text-3xl font-bold">Order Details</h2>
                    {orderFields.map((field, index) => {
                        return (
                            <FormField
                                handleFocus={handleFocus}
                                onChange={handleChange}
                                customChangeHandler={field.customChangeHandler}
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
                            Total Cost: ${orderCost}
                        </h3>
                    </div>
                    <div className="flex flex-row flex-wrap gap-6 max-h-[37rem] px-10 pb-5 overflow-y-auto overflow-x-hidden justify-center">
                        {Object.keys(orderData).map((item) => {
                            const product = products.find(
                                (product) =>
                                    product.product_id ==
                                    item.replace("product_", "")
                            );
                            return (
                                <CheckoutProductCard
                                    productId={item}
                                    productQty={orderData[item]}
                                    imgPath={product.product_img_path}
                                    productName={product.product_name}
                                    key={item}
                                />
                            );
                        })}
                    </div>
                </div>
            </form>
            <div className="flex my-8 justify-center md:justify-end md:px-20 w-full md:my-7">
                <Button
                    type="primary"
                    img="/images/icons/cookie.png"
                    clickHandler={handlePlaceOrder}
                >
                    PLACE ORDER
                </Button>
            </div>
        </>
    );
}
