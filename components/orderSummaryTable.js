

export default function OrderSummaryTable(props) {
    return (
        <table>
            <thead>
                <tr className="text-default-900 font-bold text-2xl">
                    <th className="px-6">Product</th>
                    <th className="px-6">Dozens</th>
                    <th className="px-6">Total Items</th>
                </tr>
            </thead>
            <tbody>
                {props.products.map((product) => {
                    return (
                        <tr>
                            <td>
                                {product.product_name}
                            </td>
                        </tr>
                    )
                })}

            </tbody>
        </table>
    )
}