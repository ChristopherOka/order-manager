export default function OrderSummaryTable(props) {
    return (
        <div className="overflow-auto print:overflow-hidden w-full">
            <table className="rounded-md">
                <thead>
                    <tr className="text-slate-600 top-0 left-0 z-10 sticky text-left">
                        <th className="font-medium pb-2 pr-12 pl-6 print:pl-0">
                            Product Name
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center">
                            Total Dozens
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center">
                            Total Items
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center">
                            Cost
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map((product, index) => {
                        return (
                            <tr
                                key={product.product_id}
                                className={`text-default-900 relative text-md print:border-t`}
                            >
                                <td className="py-2 pr-10 top-0 left-0 sticky md:pr-12 pl-6 font-medium print:pl-0">
                                    {product.product_name}
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start">
                                    {product.measured_per != 1 ? (
                                        <>
                                            <span className="rounded-xl bg-teal-100 px-3 w-fit print:mr-5 print:px-0">
                                                {(parseFloat(product.total_dozens) || 0) + (parseFloat(product.additional_total_dozens) || 0) || "-"}
                                            </span>
                                            <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                        </>
                                    ) : null}
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start">
                                    <span className="rounded-xl bg-yellow-100 px-3 w-fit print:mr-5 print:px-0">
                                        {(parseFloat(product.total_quantity) || 0) + (parseFloat(product.additional_total_dozens || 0)) || "-"}
                                    </span>
                                    <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start">
                                    <span className="rounded-xl bg-green-100 px-3 w-fit print:mr-5 print:px-0">
                                        $
                                        {product.cost *
                                            (product.total_dozens ||
                                                product.total_quantity) || "-"}
                                    </span>
                                    <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                            </tr>
                        );
                    })}
                    <tr className={`text-default-900 text-md print:border-t`}>
                        <td className="font-bold py-2 pr-10 md:pr-12 pl-6 print:pl-0">
                            Totals
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start">
                            <span className="rounded-xl bg-teal-100 px-3 w-fit print:mr-5 print:px-0">
                                {props.products.reduce((total, product) => {
                                    return total + product.total_dozens;
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start">
                            <span className="rounded-xl bg-yellow-100 px-3 w-fit print:mr-5 print:px-0">
                                {props.products.reduce((total, product) => {
                                    return total + product.total_quantity;
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start">
                            <span className="rounded-xl bg-green-100 px-3 w-fit print:mr-5 print:px-0">
                                $
                                {props.products.reduce((total, product) => {
                                    return (
                                        total +
                                        product.cost *
                                            (product.total_dozens ||
                                                product.total_quantity)
                                    );
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
