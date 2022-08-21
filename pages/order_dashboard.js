import Navbar from "../components/Navbar";
import DateSidebar from "../components/DateSidebar";
import OrderSummaryCard from "../components/OrderSummaryCard";
import Button from "../components/Button";
import Image from "next/image";
import { useState } from "react";
import * as db from "./api/database";

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

export default function OrderDashboard({
    initialOrderData,
    initialProductNames,
}) {
    const [activeDate, setActiveDate] = useState("All");
    const [orderData, setOrderData] = useState(initialOrderData);
    const [productNames, setProductNames] = useState(initialProductNames);

    const dateRanges = {
        All: {
            start_date: new Date(0),
            end_date: new Date(
                new Date().setFullYear(new Date().getFullYear() + 1)
            ),
        },
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
        const [newOrderData, newProductNames] = await Promise.all([
            db.getAllData(dateRanges[date]),
            db.getProductNames(),
        ]);
        setOrderData(newOrderData);
        setProductNames(newProductNames);
        setActiveDate(date);
    };

    const openPrintLayout = async () => {
        await document.querySelectorAll(".flip-override").forEach((el) => {
            el.click();
        });
        window.print();
        return true;
    };

    return (
        <div className="overflow-hidden">
            <h1 className="absolute flex justify-center items-center text-4xl font-bold py-6 bg-default-100 w-full print:hidden">
                ORDER DASHBOARD
                <div>
                    <Button
                        type="secondary-md"
                        img="/images/icons/printer.png"
                        clickHandler={openPrintLayout}
                    />
                </div>
            </h1>
            <div className="absolute z-[100] top-0 left-0 w-62 flex items-center justify-start my-20 sm:my-5 pl-2 md:pr-5 print:hidden">
                <div className="w-[50px] sm:w-[70px] md:w-[100px]">
                    <Image
                        src="/images/misc/logo.png"
                        width="100"
                        height="100"
                    />
                </div>
            </div>
            <div className="print:hidden">
                <DateSidebar activeDate={activeDate} changeDate={changeDate} />
            </div>
            <div
                className={`grid grid-cols-1 gap-y-3 max-h-[82vh] overflow-auto ml-20 pl-5 
            pr-5 pt-24 mt-10 pb-8 justify-start md:ml-40 sm:grid-rows-2 sm:grid-cols-none sm:max-h-full 
            sm:grid-flow-col sm:gap-x-10 sm:gap-y-5 print:max-h-full print:top-0 
            print:left-0 print:table print:m-0 print:p-0 print:gap-0 print:overflow-hidden`}
            >
                {orderData.map((order) => {
                    return (
                        <OrderSummaryCard
                            key={order.order_uid}
                            order={order}
                            productNames={productNames}
                        />
                    );
                })}
            </div>
            <div className="print:hidden">
                <Navbar activeTab="order_dashboard" />
            </div>
        </div>
    );
}
