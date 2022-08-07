import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../utils/supabase";

export async function getServerSideProps() {
    const { data: orderData, error } = await supabase
        .from("orders")
        .select(
            `
            order_uid,
            has_paid,
            is_validated,
            payment_type,
            additional_information,
            order_cost,
            delivery_date,
            misc_fees,
            creation_timestamp,
            customers ( 
                customer_name, 
                email, 
                phone, 
                address,
                city
             )
            `
        )
        .order("creation_timestamp", "asc");

    if (error) {
        console.log(error);
    }

    const { data: orderItemsData, error2 } = await supabase.from("order_items")
        .select(`
            product_id,
            order_uid,
            quantity
        `);

    if (error2) {
        console.log(error2);
    }

    const { data: productNames, error3 } = await supabase
        .from("products")
        .select("product_name, product_id")
        .order("product_id", "asc");

    if (error3) {
        console.log(error3);
    }

    return {
        props: {
            orderData,
            orderItemsData,
            productNames,
        },
    };
}

export default function Orders({ orderData, orderItemsData, productNames }) {
    //todo: figure this out
    const [orders, setOrders] = useState({});
    useEffect(() => {
        const subscription = supabase
            .from("*")
            .on("*", (payload) => {
                console.log("New order: ", payload);
                setOrders({ ...orders, ...payload });
            })
            .subscribe();

        return () => supabase.removeSubscription(subscription);
    }, []);

    return (
        <>
            <h2>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </h2>
            <table>
                <thead>
                    <tr>
                        <th>Delivery Date</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>Payment Received</th>
                        <th>Validated</th>
                        <th>Payment Type</th>
                        <th>Additional Information</th>
                        <th>Order Cost</th>
                        <th>Misc. Fees</th>
                        <th>Time of Order</th>
                        {productNames.map((product) => {
                            return (
                                <th key={product.product_id}>
                                    {product.product_name}
                                </th>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {orderData.map((order) => {
                        return (
                            <tr key={order.order_uid}>
                                <td>{order.delivery_date}</td>
                                <td>{order.customers.customer_name}</td>
                                <td>{order.customers.email}</td>
                                <td>{order.customers.phone}</td>
                                <td>{order.customers.address}</td>
                                <td>{order.customers.city}</td>
                                <td>{order.has_paid ? "Yes" : "No"}</td>
                                <td>{order.is_validated ? "Yes" : "No"}</td>
                                <td>{order.payment_type}</td>
                                <td>
                                    {order.additional_information ?? "None"}
                                </td>
                                <td>{order.order_cost ?? 0}</td>
                                <td>{order.misc_fees ?? 0}</td>
                                <td>{order.creation_timestamp}</td>
                                {productNames.map((product) => {
                                    const productItem = orderItemsData.find(
                                        (item) =>
                                            item.product_id ===
                                                product.product_id &&
                                            item.order_uid === order.order_uid
                                    );
                                    return (
                                        <td key={product.product_id}>
                                            {productItem
                                                ? productItem.quantity
                                                : "-"}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}
