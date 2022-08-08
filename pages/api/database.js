import supabase from "../../utils/supabase";

export async function insertCustomerAndOrder(orderData) {
    const { data, error } = await supabase.rpc(
        "insert_customer_and_order",
        orderData
    );

    if (error) {
        console.log(error);
        return false;
    } else {
        return true;
    }
}

export async function getTotalProductQtyByDate(dates) {
    const { data, error } = await supabase.rpc(
        "get_total_product_qty_by_date",
        {
            start_date: dates.start_date,
            end_date: dates.end_date,
        }
    );

    if (error) {
        console.log(error);
        return false;
    }
    return data;
}

export async function getAllProductsData() {
    const { data: products, error } = await supabase
        .from("products")
        .select("*")
        .order("product_id", "asc");

    if (error) {
        console.log(error);
    }

    return products;
}

export async function getOrderCounts(dates) {
    const { data, error } = await supabase.rpc("get_order_counts", {
        start_date: dates.start_date,
        end_date: dates.end_date,
    });
    if (error) {
        console.log(error);
        return false;
    }
    return data;
}

export async function getAllData(dates) {
    const { data: orderData, error } = await supabase
        .from("orders")
        .select(
            `
        order_uid,
        has_paid,
        is_verified,
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
        .gt("delivery_date", dates.start_date.toISOString())
        .lte("delivery_date", dates.end_date.toISOString())
        .order("creation_timestamp", "asc");

    if (error) {
        console.log(error);
    }

    const { data: orderItemsData, error2 } = await supabase.rpc(
        "get_order_items",
        {
            start_date: dates.start_date,
            end_date: dates.end_date,
        }
    );

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
        orderData,
        orderItemsData,
        productNames,
    };
}
