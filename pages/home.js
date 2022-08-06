import Navbar from "../components/Navbar";
import DateSidebar from "../components/dateSidebar";
import OrderSummaryTable from "../components/orderSummaryTable";
import Image from "next/image";
import * as db from "./api/database.js";

export async function getServerSideProps () {
    const smallestPossibleDate = new Date(0);
    const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    const dates = {
        start_date: smallestPossibleDate,
        end_date: oneYearFromNow
    };
    console.log(dates);
    const products = await db.getTotalProductQtyByDate(dates);
    console.log(products);
    return {
        props: {
            products,
        },
    };
}

export default function Home({products}) {
    return (
        <div className="w-screen h-screen relative">
            <div className="absolute top-0 left-0 w-screen flex items-center justify-center my-5">
                <Image src="/images/misc/logo.png" width="100" height="100"/>
            </div>
            <DateSidebar />
            <OrderSummaryTable products={products}/>
            <Navbar homeActive={true}/>
        </div>
    );
}
