import supabase from "../../utils/supabase";

export async function insertNewCustomer(data) {
    const { data: response, error } = await supabase
        .from("customers")
        .insert(data);

    if (error) {
        console.log(error);
    }

    return response;
}

export async function insertNewOrder(data) {
    const { data: response, error } = await supabase
        .from("orders")
        .insert(data);

    if (error) {
        console.log(error);
    }

    return response;
}

export async function insertNewOrderItems(data) {
    const { data: response, error } = await supabase
        .from("order_items")
        .insert(data);

    if (error) {
        console.log(error);
    }

    return response;
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
