import supabase from "../../utils/supabase";

export async function insertCustomerAndOrder(data) {
    const { res, error } = await supabase.rpc('insertCustomerAndOrder', data);

    if (error) {
        console.log(error);
    }

    return res;
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
