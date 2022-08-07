import Navbar from "../components/navbar";
import DateSidebar from "../components/dateSidebar";
import OrderSummaryTable from "../components/orderSummaryTable";
import Button from "../components/button";
import AtAGlanceRow from "../components/atAGlanceRow";
import Image from "next/image";
import { useState } from "react";
import * as db from "./api/database.js";

const processProducts = (products) => {
    let productsWithQty = [];

    products.forEach((product) => {
        // product_dozens is product_quantity if measured_per is 12
        // product_total is product_quantity multiplied by measured_per
        productsWithQty.push({
            product_id: product.product_id,
            product_name: product.product_name,
            total_dozens:
                parseInt(product.measured_per) == 12
                    ? parseFloat(product.quantity)
                    : 0,
            total_quantity:
                parseFloat(product.quantity) * parseInt(product.measured_per),
            measured_per: product.measured_per,
        });
        // if there are associated products, loop through the associated products
        // attempt to find the product in the productsWithQty array with matching product_id
        // if it exists, increment previous dozens by quantity of assiated product
        // increment total by quantity of associated product multiplied by measured_per
        if (product.associated_products) {
            for (const [product_id, quantity] of Object.entries(
                product.associated_products
            )) {
                const associated_product = productsWithQty.find(
                    (assoc_product) => assoc_product.product_id == product_id
                );
                if (associated_product) {
                    associated_product.total_dozens +=
                        parseFloat(quantity) * parseFloat(product.quantity);
                    associated_product.total_quantity +=
                        parseFloat(quantity) *
                        parseFloat(product.quantity) *
                        parseInt(associated_product.measured_per);
                }
            }
        }
    });

    return productsWithQty;
};

export async function getServerSideProps() {
    const smallestPossibleDate = new Date(0);
    const oneYearFromNow = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
    );
    const dates = {
        start_date: smallestPossibleDate,
        end_date: oneYearFromNow,
    };
    const products = await db.getTotalProductQtyByDate(dates);
    const productsWithQty = processProducts(products);
    const initialOrderCounts = await db.getOrderCounts(dates);
    return {
        props: {
            productsWithQty,
            initialOrderCounts,
        },
    };
}

export default function Home({ productsWithQty, initialOrderCounts }) {
    const [startDate, setStartDate] = useState("Beginning of Time");
    const [endDate, setEndDate] = useState("End of Time");
    const [activeDate, setActiveDate] = useState("All");
    const [products, setProducts] = useState(productsWithQty);
    const [orderCounts, setOrderCounts] = useState(initialOrderCounts);

    const openPrintLayout = () => {
        window.print();
        return true;
    };

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
            setStartDate("Beginning of Time");
            setEndDate("End of Time");
            setProducts(productsWithQty);
            setOrderCounts(initialOrderCounts);
        } else {
            const products = await db.getTotalProductQtyByDate(
                dateRanges[date]
            );
            setProducts(processProducts(products));
            setStartDate(dateRanges[date].start_date.toDateString());
            setEndDate(dateRanges[date].end_date.toDateString());
            const newOrderCounts = await db.getOrderCounts(dateRanges[date]);
            setOrderCounts(newOrderCounts);
        }
        setActiveDate(date);
    };

    return (
        <div className="w-screen h-screen relative">
            <div className="absolute top-0 left-0 w-screen flex items-center justify-start my-5 pl-2 md:justify-end md:pr-5 print:hidden">
                <div className="w-[70px] md:w-[100px]">
                    <Image
                        src="/images/misc/logo.png"
                        width="100"
                        height="100"
                    />
                </div>
            </div>
            <h1 className="hidden text-default-900 font-bold text-4xl absolute top-0 left-0 my-8 w-screen items-center justify-center print:hidden lg:flex">
                HOME
            </h1>
            <div className="print:hidden">
                <DateSidebar activeDate={activeDate} changeDate={changeDate} />
            </div>
            <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-between pt-8 pb-24 md:flex-row">
                <div className="ml-24 mr-4 flex flex-col justify-center overflow-auto sm:ml-28 md:ml-44 print:mx-0 print:pt-0">
                    <div className="hidden print:flex text-default-900 text-lg flex-col">
                        <div>Start Date: {startDate}</div>
                        <div>End Date: {endDate}</div>
                    </div>
                    <div className="flex justify-between items-center pb-6">
                        <h2 className="text-default-900 font-bold text-3xl text-center">
                            <span className="print:hidden">WEEKLY SUMMARY</span>
                            <span className="hidden print:block">
                                DELIVERY DATE:{" "}
                                {endDate == "End of Time" ? "All" : endDate}
                            </span>
                        </h2>
                        <div className="print:hidden">
                            <Button
                                img="/images/icons/printer.png"
                                type="secondary-md"
                                clickHandler={openPrintLayout}
                            ></Button>
                        </div>
                    </div>
                    <OrderSummaryTable products={products} />
                </div>
                <div className="hidden items-center mr-10 xl:mr-52 2xl:mr-80 md:flex print:hidden">
                    <div className="bg-default-100 shadow-box flex flex-col rounded-md">
                        <h2 className="text-default-900 font-bold text-3xl py-8 px-12">
                            AT A GLANCE
                        </h2>
                        <div className="text-default-900 px-3 py-5 pt-0 text-lg lg:text-2xl lg:px-12 ">
                            <AtAGlanceRow
                                text="Total Orders:"
                                src="/images/icons/edit_icon.png"
                                number={orderCounts[0].total_orders}
                            />
                            <AtAGlanceRow
                                text="Unverified Orders:"
                                src="/images/icons/red_exclamation.png"
                                number={orderCounts[0].unverified_orders}
                            />
                            <AtAGlanceRow
                                text="Unpaid Orders:"
                                src="/images/icons/yellow_unpaid.png"
                                number={orderCounts[0].unpaid_orders}
                            />
                            <AtAGlanceRow
                                text="Verified Orders:"
                                src="/images/icons/green_checkmark.png"
                                number={orderCounts[0].verified_orders}
                            />
                            <div className="pb-6">
                                <AtAGlanceRow
                                    text="Paid Orders:"
                                    src="/images/icons/green_money.png"
                                    number={orderCounts[0].paid_orders}
                                />
                            </div>
                            <AtAGlanceRow
                                text="Total Dozens:"
                                src="/images/icons/multiple_cookies.png"
                                number={products.reduce((total, product) => {
                                    return total + product.total_dozens;
                                }, 0)}
                            />
                            <AtAGlanceRow
                                text="Total Items:"
                                src="/images/icons/black_box.png"
                                number={products.reduce((total, product) => {
                                    return total + product.total_quantity;
                                }, 0)}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="print:hidden">
                <Navbar homeActive={true} />
            </div>
        </div>
    );
}
