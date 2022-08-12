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
    const { data, error } = await supabase.rpc("get_all_order_data", {
        start_date: dates.start_date,
        end_date: dates.end_date,
    });

    if (error) {
        console.log(error);
    }

    return data;
}

export async function getProductNames() {
    const { data, error } = await supabase
        .from("products")
        .select("product_name, product_id")
        .order("product_id", "asc");

    if (error) {
        console.log(error);
    }

    return data;
}

export async function updateTableData(
    table_data,
    uid,
    col_name,
    ordersColNames
) {
    const customers_columns = [
        "customer_name",
        "email",
        "phone",
        "address",
        "city",
    ];
    const orders_columns = [
        "delivery_date",
        "has_paid",
        "is_verified",
        "payment_type",
        "additional_information",
        "order_cost",
        "creation_timestamp",
    ];

    let table_name = "order_items";
    let match_columns = { order_uid: uid, product_id: col_name };
    let column_name = "quantity";
    let updateTable = true;
    let inserted_data = table_data || 0;

    if (customers_columns.includes(col_name)) {
        table_name = "customers";
        match_columns = { customer_uid: uid };
        column_name = col_name;
        inserted_data = table_data || "-";
    } else if (orders_columns.includes(col_name)) {
        table_name = "orders";
        match_columns = { order_uid: uid };
        column_name = col_name;
        inserted_data = table_data || "-";
    }
    if (table_name === "order_items") {
        const { data, error } = await supabase
            .from("order_items")
            .select("*")
            .match(match_columns);
        if (error) {
            console.log(error);
            return false;
        }
        if (data.length === 0) {
            const { error2 } = await supabase.from("order_items").insert([
                {
                    order_uid: uid,
                    product_id: col_name,
                    quantity: inserted_data || 0,
                },
            ]);
            updateTable = false;
            if (error2) {
                console.log(error2);
                return false;
            }
        }
    }
    if (updateTable) {
        const { data, error } = await supabase
            .from(table_name)
            .update({
                [column_name]: inserted_data,
            })
            .match(match_columns);
        if (error) {
            console.log(error);
            return false;
        }
    }

    return true;
}

export async function deleteOrder(order_uid) {
    const { data, error } = await supabase.rpc("delete_order", {
        deletion_order_uid: order_uid,
    });
    if (error) {
        console.log(error);
        return false;
    }
    return true;
}
