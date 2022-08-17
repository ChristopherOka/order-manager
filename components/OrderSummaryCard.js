import Image from "next/image";
import Popover from "./popover";
import { useState } from "react";
import Checkbox from "./Checkbox";
import * as db from "../pages/api/database";

export default function OrderSummaryCard(props) {
    const [flipped, setFlipped] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState(
        props.order.is_verified
    );
    const [paymentStatus, setPaymentStatus] = useState(props.order.has_paid);

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
        <div className="relative">
            <div
                className={`bg-default-100 px-4 py-3 rounded-md shadow-box w-[70vw] h-80 sm:w-96 group ${
                    flipped == "flipped"
                        ? "animate-frontTileFlip"
                        : flipped == "unflipped"
                        ? "animate-backTileFlip animation-delay-400"
                        : null
                }`}
            >
                <div className="flex justify-between">
                    <h2 className="text-default-900 font-bold text-2xl pb-2">
                        {props.order.customer_name}
                    </h2>
                    <div className="flex gap-2">
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
                <div className="overflow-y-auto max-h-60 pt-2">
                    {Object.keys(props.order.order_items).map((item) => {
                        if (props.order.order_items[item] > 0) {
                            return (
                                <div
                                    key={item}
                                    className="border-b-2 text-lg pt-2"
                                >
                                    {props.order.order_items[item]}x&nbsp;
                                    {
                                        props.productNames.find(
                                            (product) =>
                                                product.product_id == item
                                        ).product_name
                                    }
                                </div>
                            );
                        } else {
                            return <div key={item}></div>;
                        }
                    })}
                </div>
            </div>
            <div
                className={`group absolute bg-default-100 px-4 py-3 rounded-md shadow-box w-[70vw] h-80 sm:w-96 top-0 ${
                    flipped == "flipped"
                        ? "animate-backTileFlip animation-delay-400"
                        : flipped == "unflipped"
                        ? "animate-frontTileFlip"
                        : "hidden"
                }`}
            >
                <div className="flex justify-between">
                    <h2 className="text-default-900 font-bold text-2xl pb-2">
                        {props.order.customer_name}
                    </h2>

                    <div className="flex gap-2">
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
                <div>
                    <div className="overflow-y-auto max-h-60 pt-2">
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">VERIFIED:</h3>
                            <Checkbox
                                defaultChecked={props.order.is_verified}
                                handleInputChange={toggleOrderVerification}
                            />
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">ORDER PAID:</h3>
                            <Checkbox
                                defaultChecked={props.order.has_paid}
                                handleInputChange={toggleOrderPaymentStatus}
                            />
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">Delivery Date:</h3>
                            <p>{props.order.delivery_date}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">Address:</h3>
                            <p>{props.order.address}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className=" font-bold">City:</h3>
                            <p>{props.order.city}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">Payment Type:</h3>
                            <p>{props.order.payment_type}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">Misc. Fees:</h3>
                            <p>
                                $
                                {(
                                    parseFloat(props.order.misc_fees) || 0
                                ).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">Total Cost:</h3>
                            <p>
                                $
                                {(
                                    parseFloat(props.order.misc_fees || 0) +
                                    parseFloat(props.order.order_cost)
                                ).toFixed(2)}
                            </p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">Email:</h3>
                            <p>{props.order.email}</p>
                        </div>
                        <div className="flex text-default-900 text-lg gap-2">
                            <h3 className="font-bold">Phone:</h3>
                            <p>{props.order.phone}</p>
                        </div>
                        <div className="flex flex-col text-default-900 text-lg">
                            <h3 className="font-bold">
                                Additional Information:
                            </h3>
                            <p className="leading-6">
                                {props.order.additional_information || "None"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
