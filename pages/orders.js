import { useEffect, useState } from "react";
import Link from "next/link";
import * as db from "./api/database";
import OrderTableData from "../components/orderTableData";
import Navbar from "../components/navbar";
import DateSidebar from "../components/dateSidebar";

export async function getServerSideProps() {
    const smallestPossibleDate = new Date(0);
    const oneYearFromNow = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
    );
    const dates = {
        start_date: smallestPossibleDate,
        end_date: oneYearFromNow,
    };
    const { orderData, orderItemsData, productNames } = await db.getAllData(
        dates
    );

    return {
        props: {
            initialOrderData: orderData,
            initialOrderItemsData: orderItemsData,
            initialProductNames: productNames,
        },
    };
}

export default function Orders({
    initialOrderData,
    initialOrderItemsData,
    initialProductNames,
}) {
    const [activeDate, setActiveDate] = useState("All");
    const [orderData, setOrderData] = useState(initialOrderData);
    const [orderItemsData, setOrderItemsData] = useState(initialOrderItemsData);
    const [productNames, setProductNames] = useState(initialProductNames);

    const dateRanges = {
        "1st": {
            start_date: new Date("2022-11-24"),
            end_date: new Date("2022-12-01"),
        },
        "8th": {
            start_date: new Date("2022-12-01"),
            end_date: new Date("2022-12-08"),
        },
        "15th": {
            start_date: new Date("2022-12-08"),
            end_date: new Date("2022-12-15"),
        },
        "22nd": {
            start_date: new Date("2022-12-15"),
            end_date: new Date("2022-12-22"),
        },
        "29th": {
            start_date: new Date("2022-12-22"),
            end_date: new Date("2022-12-29"),
        },
    };

    const changeDate = async (date) => {
        if (date == "All") {
            setOrderData(initialOrderData);
            setOrderItemsData(initialOrderItemsData);
        } else {
            const newData = await db.getAllData(dateRanges[date]);
            setOrderData(newData.orderData);
            setOrderItemsData(newData.orderItemsData);
            setProductNames(newData.productNames);
        }
        setActiveDate(date);
    };

    const editTableData = (e) => {
        const button = e.currentTarget;
        const uid = button.dataset["uid"];
        const col_name = button.dataset["col_name"];
        const input = document.getElementById(`${uid}-${col_name}-input`);
        const text = document.getElementById(`${uid}-${col_name}-text`);
        const btns = document.getElementById(`${uid}-${col_name}-btns`);
        const value = text.innerText;
        text.classList.add("hidden");
        input.setAttribute("size", value.length);
        input.value = value;
        input.focus();
        input.classList.remove("hidden");

        button.classList.add("hidden");
        btns.classList.remove("hidden");
    };

    const saveTableEdit = async (e) => {
        const button = e.currentTarget;
        const uid = button.dataset["uid"];
        const col_name = button.dataset["col_name"];
        const input = document.getElementById(`${uid}-${col_name}-input`);
        const value = input.value;
        await db.updateTableData(value, uid, col_name, orderData[0]);
        const text = document.getElementById(`${uid}-${col_name}-text`);
        const btns = document.getElementById(`${uid}-${col_name}-btns`);
        const editBtn = document.getElementById(`${uid}-${col_name}-edit`);
        text.innerText = parseInt('col_name') ? value || 0 : value || '-';
        text.classList.remove("hidden");
        input.classList.add("hidden");
        editBtn.classList.remove("hidden");
        btns.classList.add("hidden");
    };

    const cancelTableEdit = (e) => {
        const button = e.currentTarget;
        const uid = button.dataset["uid"];
        const col_name = button.dataset["col_name"];
        const input = document.getElementById(`${uid}-${col_name}-input`);
        const text = document.getElementById(`${uid}-${col_name}-text`);
        const btns = document.getElementById(`${uid}-${col_name}-btns`);
        const editBtn = document.getElementById(`${uid}-${col_name}-edit`);
        text.classList.remove("hidden");
        input.classList.add("hidden");
        editBtn.classList.remove("hidden");
        btns.classList.add("hidden");
    };

    return (
        <div className="overflow-hidden h-screen relative ">
            <h1 className="text-center text-4xl font-bold py-6">ALL ORDERS</h1>
            <div>
                <DateSidebar activeDate={activeDate} changeDate={changeDate} />
            </div>
            <div className="flex absolute top-0 left-0 my-20 ">
                <div className="overflow-auto ml-20 mr-10 h-[80vh] shadow-box w-[77vw] sm:w-[82vw] sm:ml-24 md:ml-36 xl:w-[88vw]">
                    <table className="bg-default-100 rounded-md w-screen">
                        <thead>
                            <tr className="border-b-2 whitespace-nowrap">
                                <th className="py-3 px-2">Delivery Date</th>
                                <th className="py-3 px-2">Customer Name</th>
                                <th className="py-3 px-2">Email</th>
                                <th className="py-3 px-2">Phone</th>
                                <th className="py-3 px-2">Street Address</th>
                                <th className="py-3 px-2">City</th>
                                <th className="py-3 px-2">Payment Received</th>
                                <th className="py-3 px-2">Verified</th>
                                <th className="py-3 px-2">Payment Type</th>
                                <th className="py-3 px-2">
                                    Additional Information
                                </th>
                                <th className="py-3 px-2">Order Cost</th>
                                <th className="py-3 px-2">Misc. Fees</th>
                                <th className="py-3 px-2">Time of Order</th>
                                {productNames.map((product) => {
                                    return (
                                        <th
                                            className="py-3 px-2 whitespace-normal"
                                            key={product.product_id}
                                        >
                                            {product.product_name}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map((order, index) => {
                                return (
                                    <tr
                                        key={order.order_uid}
                                        className={`${
                                            index % 2 == 0 ? "bg-pink-100" : ""
                                        }`}
                                    >
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="delivery_date"
                                            >
                                                {new Date(
                                                    order.delivery_date
                                                ).toDateString()}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={
                                                    order.customers.customer_uid
                                                }
                                                col_name="customer_name"
                                            >
                                                {order.customers.customer_name}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={
                                                    order.customers.customer_uid
                                                }
                                                col_name="email"
                                            >
                                                {order.customers.email}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={
                                                    order.customers.customer_uid
                                                }
                                                col_name="phone"
                                            >
                                                {order.customers.phone}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={
                                                    order.customers.customer_uid
                                                }
                                                col_name="address"
                                            >
                                                {order.customers.address}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={
                                                    order.customers.customer_uid
                                                }
                                                col_name="city"
                                            >
                                                {order.customers.city}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="has_paid"
                                            >
                                                {order.has_paid ? "Yes" : "No"}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="is_verified"
                                            >
                                                {order.is_verified
                                                    ? "Yes"
                                                    : "No"}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="payment_type"
                                            >
                                                {order.payment_type}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="additional_information"
                                            >
                                                {order.additional_information}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="order_cost"
                                            >
                                                {order.order_cost}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="misc_fees"
                                            >
                                                {order.misc_fees}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="creation_timestamp"
                                            >
                                                {new Date(
                                                    order.creation_timestamp
                                                ).toDateString()}
                                            </OrderTableData>
                                        </td>

                                        {productNames.map((product) => {
                                            const productQuantity =
                                                orderItemsData.find((item) => {
                                                    return (
                                                        item.product_id ===
                                                            product.product_id &&
                                                        item.order_uid ===
                                                            order.order_uid
                                                    );
                                                });
                                            return (
                                                <td key={product.product_id}>
                                                    <OrderTableData
                                                        editTableData={
                                                            editTableData
                                                        }
                                                        saveTableEdit={
                                                            saveTableEdit
                                                        }
                                                        cancelTableEdit={
                                                            cancelTableEdit
                                                        }
                                                        uid={order.order_uid}
                                                        col_name={
                                                            product.product_id
                                                        }
                                                    >
                                                        {productQuantity
                                                            ? productQuantity.quantity
                                                            : 0}
                                                    </OrderTableData>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Navbar activeTab="orders" />
        </div>
    );
}
