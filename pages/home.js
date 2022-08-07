import Navbar from "../components/Navbar";
import DateSidebar from "../components/dateSidebar";
import OrderSummaryTable from "../components/orderSummaryTable";
import Button from "../components/button";
import Image from "next/image";
import { useState } from "react";
import * as db from "./api/database.js";

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

    // process products
    // take all products, multiply them by their measured_per to get total qty
    // if measured_per is not 12, dont' put them in the dozens column
    // if there's associated products, add the key * quantity of assortment to the total qty of each product

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
        console.log(productsWithQty);
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

    return {
        props: {
            productsWithQty,
        },
    };
}

export default function Home({ productsWithQty }) {
    const [startDate, setStartDate] = useState('Beginning of Time');
    const [endDate, setEndDate] = useState('End of Time');

    const openPrintLayout = () => {
        window.print();
    };

    return (
        <div className="w-screen h-screen relative">
            <div className="absolute top-0 left-0 w-screen flex items-center justify-start my-5 mx-3 print:hidden">
                <Image src="/images/misc/logo.png" width="100" height="100" />
            </div>
            <div className="print:hidden">
                <DateSidebar />
            </div>
            
            <div className="absolute mx-24 top-0 left-0 flex flex-col h-full justify-center pt-8 pb-24 overflow-auto sm:mx-28 md:mx-44 print:mx-0 print:pt-0">
                <div className="hidden print:flex text-default-900 text-lg flex-col">
                        <div>Start Date: {startDate}</div>
                        <div>End Date: {endDate}</div>
                </div>
                <div className="flex justify-between items-center pb-6">
                    
                    <h2 className="text-default-900 font-bold text-3xl text-center">
                        <span className="print:hidden">WEEKLY SUMMARY</span>
                        <span className="hidden print:block">DELIVERY DATE: {endDate == 'End of Time' ? 'All' : endDate}</span>
                    </h2>
                    <div className="print:hidden">
                        <Button
                            img="/images/icons/printer.png"
                            type="secondary-md"
                            clickHandler={openPrintLayout}
                        ></Button>
                    </div>
                </div>
                <OrderSummaryTable productsWithQty={productsWithQty} />
            </div>
            <div className="print:hidden">
                <Navbar homeActive={true} />
            </div>
            
        </div>
    );
}
