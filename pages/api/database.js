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
