import { useState } from "react";
import * as db from "./api/database";
import OrderTableData from "../components/OrderTableData";
import Navbar from "../components/Navbar";
import DateSidebar from "../components/DateSidebar";
import ConfirmDeletionModal from "../components/ConfirmDeletionModal";
import Image from "next/image";

export async function getServerSideProps() {
    const smallestPossibleDate = new Date(0);
    const oneYearFromNow = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
    );
    const dates = {
        start_date: smallestPossibleDate,
        end_date: oneYearFromNow,
    };
    const [orderData, products] = await Promise.all([
        db.getAllData(dates),
        db.getProductNames(),
    ]);

    return {
        props: {
            initialOrderData: orderData,
            initialProductNames: products,
        },
    };
}

export default function Orders({ initialOrderData, initialProductNames }) {
    const [activeDate, setActiveDate] = useState("All");
    const [orderData, setOrderData] = useState(initialOrderData);
    const [productNames, setProductNames] = useState(initialProductNames);
    const [deletedOrderUid, setDeletedOrderUid] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalBody, setModalBody] = useState("");

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
        } else {
            const [newOrderData, newProductNames] = await Promise.all([
                db.getAllData(dateRanges[date]),
                db.getProductNames(),
            ]);
            setOrderData(newOrderData);
            setProductNames(newProductNames);
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
        await db.updateTableData(value, uid, col_name);
        const text = document.getElementById(`${uid}-${col_name}-text`);
        const btns = document.getElementById(`${uid}-${col_name}-btns`);
        const editBtn = document.getElementById(`${uid}-${col_name}-edit`);
        text.innerText = parseInt("col_name") ? value || 0 : value || "-";
        text.classList.remove("hidden");
        input.classList.add("hidden");
        editBtn.classList.remove("hidden");
        btns.classList.add("hidden");
        const orders_columns = [
            "delivery_date",
            "has_paid",
            "is_verified",
            "payment_type",
            "additional_information",
            "order_cost",
            "misc_fees",
            "creation_timestamp",
        ];
        if (orders_columns.includes(col_name) && col_name !== "is_verified") {
            document.getElementById(`${uid}-is_verified-text`).innerText = "No";
            if ((col_name = "misc_fees")) {
                const order_cost = document.getElementById(
                    `${uid}-order_cost-text`
                ).innerText;
                const total_cost = parseInt(order_cost) + parseInt(value);
                document.getElementById(`${uid}-total_cost-text`).innerText =
                    total_cost;
            }
        }
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

    const deleteOrder = async (order_uid) => {
        closeDeleteModal();
        await db.deleteOrder(order_uid);
        document.getElementById(`${order_uid}-row`).classList.add("hidden");
    };

    const openDeleteModal = (order_uid, customer_uid) => {
        const customerName = document.getElementById(
            `${customer_uid}-customer_name-text`
        ).innerText;
        const deliveryDate = document.getElementById(
            `${order_uid}-delivery_date-text`
        ).innerText;
        setModalBody(
            `<b>Name:</b> ${customerName}<br><b>Delivery Date:</b> ${deliveryDate}`
        );
        setModalIsOpen(true);
        setDeletedOrderUid(order_uid);
    };

    const closeDeleteModal = () => {
        setModalBody("");
        setModalIsOpen(false);
        setDeletedOrderUid(null);
    };

    return (
        <div className="overflow-hidden h-screen relative">
            <div className={`${modalIsOpen ? "" : "hidden"}`}>
                <ConfirmDeletionModal
                    header={"DELETE ORDER?"}
                    body={modalBody}
                    deleteCallback={() => {
                        deleteOrder(deletedOrderUid);
                    }}
                    closeCallback={() => {
                        closeDeleteModal();
                    }}
                />
            </div>
            <h1 className="text-center text-4xl font-bold py-6">ALL ORDERS</h1>
            <div>
                <DateSidebar activeDate={activeDate} changeDate={changeDate} />
            </div>
            <div className="flex absolute top-0 left-0 my-20 ">
                <div className="overflow-auto ml-20 mr-10 h-[80vh] shadow-box w-[77vw] sm:w-[82vw] sm:ml-24 md:ml-36 xl:w-[88vw]">
                    <table className="bg-default-100 rounded-md w-screen">
                        <thead>
                            <tr className="border-b-2 whitespace-nowrap">
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left z-10"></th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Delivery Date
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Customer Name
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Email
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Phone
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Street Address
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    City
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Payment Received
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Verified
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Payment Type
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Additional Information
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Order Cost
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Misc. Fees
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Total Cost
                                </th>
                                <th className="bg-default-100 py-3 px-4 sticky top-0 text-left">
                                    Time of Order
                                </th>
                                {productNames.map((product) => {
                                    return (
                                        <th
                                            className="bg-default-100 py-3 px-2 whitespace-normal sticky top-0"
                                            key={product.product_id}
                                        >
                                            {product.product_name}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.map((order) => {
                                return (
                                    <tr
                                        key={order.order_uid}
                                        id={`${order.order_uid}-row`}
                                    >
                                        <td>
                                            <button
                                                className="flex pl-3 w-10"
                                                onClick={() => {
                                                    openDeleteModal(
                                                        order.order_uid,
                                                        order.customer_uid
                                                    );
                                                }}
                                            >
                                                <Image
                                                    src="/images/icons/trash.svg"
                                                    height="24"
                                                    width="24"
                                                />
                                            </button>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.order_uid}
                                                col_name="delivery_date"
                                                type="date["
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
                                                uid={order.customer_uid}
                                                col_name="customer_name"
                                            >
                                                {order.customer_name}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.customer_uid}
                                                col_name="email"
                                            >
                                                {order.email}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.customer_uid}
                                                col_name="phone"
                                            >
                                                {order.phone}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.customer_uid}
                                                col_name="address"
                                            >
                                                {order.address}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                editTableData={editTableData}
                                                saveTableEdit={saveTableEdit}
                                                cancelTableEdit={
                                                    cancelTableEdit
                                                }
                                                uid={order.customer_uid}
                                                col_name="city"
                                            >
                                                {order.city}
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
                                                {order.misc_fees || 0}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                col_name="total_cost"
                                                uid={order.order_uid}
                                                readOnly={true}
                                            >
                                                {order.order_cost +
                                                    order.misc_fees}
                                            </OrderTableData>
                                        </td>
                                        <td>
                                            <OrderTableData
                                                readOnly={true}
                                                col_name="creation_timestamp"
                                            >
                                                {new Date(
                                                    order.creation_timestamp
                                                ).toDateString()}
                                            </OrderTableData>
                                        </td>

                                        {productNames.map((product) => {
                                            const productQuantity =
                                                order.order_items?.[
                                                    product.product_id
                                                ];
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
                                                            ? productQuantity
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
