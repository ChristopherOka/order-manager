import supabase from "../../utils/supabase";

export async function insertCustomerAndOrder(orderData) {
    const { data, error } = await supabase.rpc(
        "insert_customer_and_order",
        orderData
    );

    if (error) {
        return false;
    } else {
        return true;
    }
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
