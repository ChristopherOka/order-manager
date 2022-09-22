import Image from "next/image";
import Popover from "./Popover";
import { useState } from "react";
import Checkbox from "./Checkbox";
import * as db from "../pages/api/database";

export default function OrderSummaryCard(props) {
    const [flipped, setFlipped] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(
        props.order.is_verified
    );
    const [paymentStatus, setPaymentStatus] = useState(props.order.has_paid);

    const deliveryDates = [
        "Thu Dec 01 2022",
        "Thu Dec 08 2022",
        "Thu Dec 15 2022",
        "Thu Dec 22 2022",
        "Thu Dec 29 2022",
    ];

    const isIrregularDeliveryDate = !deliveryDates.includes(
        new Date(props.order.delivery_date).toDateString()
    );

    const flipCard = (flipState) => {
        if (flipState === "toggle") {
            flipped === "flipped"
                ? setFlipped("unflipped")
                : setFlipped("flipped");
        } else if (flipState && flipped) {
            setFlipped(flipState);
            return;
        }
    };

    const toggleOrderVerification = async (e) => {
        const isChecked = e.target.checked;
        setVerificationStatus(isChecked);
        await db.updateVerificationStatus(props.order.order_uid, isChecked);
    };

    const toggleOrderPaymentStatus = async (e) => {
        const isChecked = e.target.checked;
        setPaymentStatus(isChecked);
        await db.updatePaymentStatus(props.order.order_uid, isChecked);
    };

    return (
        <div className="relative print:inline-block print:w-[33vw]">
            <div className="hidden">
                <button
                    className="flip-override"
                    onClick={() => {
                        setFlipped(false);
                    }}
                ></button>
            </div>
            <div
                className={`bg-default-100 px-4 py-3 rounded-md shadow-box w-full sm:w-96 h-64 sm:h-56 md:h-64 group ${
                    flipped == "flipped"
                        ? "animate-frontTileFlip print:animate-backTileFlip"
                        : flipped == "unflipped"
                        ? "animate-backTileFlip animation-delay-400 "
                        : null
                } print:border print:rounded-none print:block print:shadow-none print:w-full print:h-full print:border-b-0 `}
            >
                <div className="flex justify-between gap-2">
                    <h2 className="text-default-900 font-bold text-2xl pb-2 truncate print:text-lg print:p-0 ">
                        {props.order.customer_name}
                    </h2>
                    <div className="flex gap-2 min-w-fit print:hidden">
                        <div>
                            <Popover
                                content={`${
                                    verificationStatus
                                        ? "Order is Verified!"
                                        : "Needs Verification"
                                }`}
                            >
                                <Image
                                    src={`/images/icons/${
                                        verificationStatus
                                            ? "green_checkmark.png"
                                            : "red_exclamation.png"
                                    }`}
                                    width="28"
                                    height="28"
                                />
                            </Popover>
                        </div>
                        <div>
                            <Popover
                                content={`${
                                    paymentStatus
                                        ? "Order Paid!"
                                        : "Has Not Paid"
                                } (${props.order.payment_type})`}
                            >
                                <Image
                                    src={`/images/icons/${
                                        paymentStatus
                                            ? "green_money.png"
                                            : "yellow_unpaid.png"
                                    }`}
                                    width="28"
                                    height="28"
                                />
                            </Popover>
                        </div>
                        <div
                            className={`${
                                isIrregularDeliveryDate ? "" : "hidden"
                            }`}
                        >
                            <Popover content={`Irregular Delivery Date`}>
                                <Image
                                    src={`/images/icons/yellow_delivery.png`}
                                    width="28"
                                    height="28"
                                />
                            </Popover>
                        </div>
                        <div
                            className={`${
                                props.order.additional_information
                                    ? ""
                                    : "hidden"
                            }`}
                        >
                            <Popover content={`Has Additional Information!`}>
                                <Image
                                    src={`/images/icons/yellow_paper.png`}
                                    width="28"
                                    height="28"
                                />
                            </Popover>
                        </div>
                        <div>
                            <button onClick={() => flipCard("toggle")}>
                                <Image
                                    src="/images/icons/right_arrow.svg"
                                    width="28"
                                    height="28"
                                />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="overflow-y-auto max-h-48 sm:max-h-40 md:max-h-48 pt-2 print:max-h-full print:p-0">
                    {Object.keys(props.order.order_items).map((item) => {
                        if (props.order.order_items[item] > 0) {
                            return (
                                <div
                                    key={item}
                                    className="border-b-2 text-lg pt-2 print:text-sm print:pt-1 flex justify-between"
                                >
                                    {props.order.order_items[item]}x&nbsp;
                                    {
                                        props.productNames.find(
                                            (product) =>
                                                product.product_id == item
                                        ).product_name
                                    }
                                    <span className="hidden print:block">
                                        <Checkbox />
                                    </span>
                                </div>
                            );
                        } else {
                            return <div key={item}></div>;
                        }
                    })}
                </div>
            </div>
            <div
                className={`group absolute bg-default-100 px-4 py-3 rounded-md shadow-box w-full h-64 sm:h-56 md:h-64 sm:w-96 top-0 ${
                    flipped == "flipped"
                        ? "animate-backTileFlip animation-delay-400"
                        : flipped == "unflipped"
                        ? "animate-frontTileFlip"
                        : "hidden print:relative print:block print:rounded-none print:border print:border-t-0 print:shadow-none print:w-full print:h-full print:py-0"
                }`}
            >
                <div className="flex justify-between gap-2 items-center print:hidden pb-2">
                    <h2 className="text-default-900 font-bold text-2xl truncate">
                        {props.order.customer_name}
                    </h2>

                    <div className="flex gap-2 min-w-fit">
                        <div className="flex justify-right items-center gap-2">
                            <div
                                id={`${props.order.order_uid}-email-sent-message`}
                            >
                                {props.order.email_sent ? (
                                    <p className="text-green-500">Sent</p>
                                ) : (
                                    <p className="text-red-500">Not Sent</p>
                                )}
                            </div>

                            <button
                                className="bg-default-100 rounded-md shadow-box px-2"
                                onClick={() => {
                                    props.openEmailModal(
                                        props.order.customer_name,
                                        props.order.order_uid
                                    );
                                }}
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M28 6H4C3.46957 6 2.96086 6.21071 2.58579 6.58579C2.21071 6.96086 2 7.46957 2 8V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H28C28.5304 26 29.0391 25.7893 29.4142 25.4142C29.7893 25.0391 30 24.5304 30 24V8C30 7.46957 29.7893 6.96086 29.4142 6.58579C29.0391 6.21071 28.5304 6 28 6V6ZM25.8 8L16 14.78L6.2 8H25.8ZM4 24V8.91L15.43 16.82C15.5974 16.9361 15.7963 16.9984 16 16.9984C16.2037 16.9984 16.4026 16.9361 16.57 16.82L28 8.91V24H4Z"
                                        fill="#161616"
                                    />
                                </svg>
                            </button>
                        </div>
                        <button
                            className="flex"
                            onClick={() => flipCard("toggle")}
                        >
                            <Image
                                src="/images/icons/right_arrow.svg"
                                width="28"
                                height="28"
                            />
                        </button>
                    </div>
                </div>
                <div>
                    <div className="overflow-y-auto max-h-44 sm:max-h-40 md:max-h-44 pt-2 print:max-h-full print:overflow-hidden print:p-0">
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">VERIFIED:</h3>
                            <Checkbox
                                defaultChecked={props.order.is_verified}
                                handleInputChange={toggleOrderVerification}
                            />
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">ORDER PAID:</h3>
                            <Checkbox
                                defaultChecked={props.order.has_paid}
                                handleInputChange={toggleOrderPaymentStatus}
                            />
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Delivery Date:</h3>
                            <p>
                                {new Date(
                                    props.order.delivery_date
                                ).toDateString()}
                            </p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Address:</h3>
                            <p>{props.order.address}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className=" font-bold">City:</h3>
                            <p>{props.order.city}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Payment Type:</h3>
                            <p>{props.order.payment_type}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Order Cost:</h3>
                            <p>
                                $
                                {(
                                    parseFloat(props.order.order_cost) || 0
                                ).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Misc. Fees:</h3>
                            <p>
                                $
                                {(
                                    parseFloat(props.order.misc_fees) || 0
                                ).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Total Cost:</h3>
                            <p>
                                $
                                {(
                                    parseFloat(props.order.misc_fees || 0) +
                                    parseFloat(props.order.order_cost)
                                ).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Email:</h3>
                            <p>{props.order.email}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2 print:text-sm">
                            <h3 className="font-bold">Phone:</h3>
                            <p>{props.order.phone}</p>
                        </div>
                        <div className="flex flex-col text-default-900 text-lg print:text-sm print:pb-2">
                            <h3 className="font-bold">
                                Additional Information:
                            </h3>
                            <p className="leading-5">
                                {props.order.additional_information || "None"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
