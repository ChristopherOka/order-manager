import FormField from "../components/formField";
import { useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid'
import * as db from "./api/database";
import Button from "../components/button";
import CheckoutProductCard from "../components/checkoutProductCard";
import { stringify } from "postcss";

export async function getStaticProps() {
    const products = await db.getAllProductsData();

    return {
        props: {
            products,
        },
    };
}

async function sendFormData(data) {
    //todo: figure out a way to delete customers, orders and order_items if any of the queries fail
    //likely I can do this in a supabase function, so I send all my data at once and parse it on supabase

    const customer_uid = uuidv4();
    const order_uid = uuidv4();
    data.customer_uid = customer_uid;
    data.order_uid = order_uid;

    data.delivery_date = new Date(data.delivery_date).toISOString();
    data.orderItems = [];
    for (const item in data.orderData) {
        data.orderItems.push({
            order_uid,
            product_id: item.replace('product_', ''),
            quantity: data.orderData[item],
            order_item_uid: uuidv4(),
        })
    }
    
    delete data.orderData;

    console.log(data);
    // const { data, error } = await db.insertCustomerAndOrder(allOrderData);

    debugger
    // await db.insertNewCustomer(customerData);
    // orderData.customer_uid = customer_uid;
    // await db.insertNewOrder(orderData);
    // db.insertNewOrderItems(orderItemsData);
    //delete recent customer and order if any of the queries fail
}

export default function Checkout({ products }) {
    const [formData, updateFormData] = useState({});
    const [emptyFields, updateEmptyFields] = useState({});
    const router = useRouter();

    const data = router.query;
    const { orderCost, ...orderData } = data;

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
        if (!validateForm(formData)) {
            alert("Please fill in all required fields");
            return;
        }

        await sendFormData({...formData, orderCost, orderData});
        router.push("/thank_you");
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
        }
        updateEmptyFields({ ...emptyFields, ...newEmptyFields });

        return isValid;
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
            options: ["Mississauga", "Burlington"],
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
            options: ["E-Transfer", "Cash"],
            required: true,
        },
        {
            name: "delivery_date",
            text: "Delivery Date",
            fieldStyle: "select",
            options: [
                "December 1",
                "December 8",
                "December 15",
                "December 22",
                "December 29",
            ],
            required: true,
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
            <h1 className="text-5xl text-default-900 font-bold text-center w-full pt-10 pb-16">
                CHECKOUT
            </h1>
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
                                error={emptyFields[field.name]}
                                type={field.type}
                                name={field.name}
                                text={field.text}
                                fieldStyle={field.fieldStyle}
                                options={field.options}
                                required={field.required}
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
