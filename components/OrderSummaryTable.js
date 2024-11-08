export default function OrderSummaryTable(props) {
    return (
        <div className="overflow-auto print:overflow-hidden w-full">
            <table className="rounded-md">
                <thead>
                    <tr className="text-slate-600 top-0 left-0 z-10 sticky text-left [&>th]:print:bg-transparent print:!bg-transparent">
                        <th className="font-medium pb-2 pr-12 pl-6 print:pl-0 print:pr-6">
                            Product Name
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center print:pr-6">
                            Total Dozens
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center print:pr-6">
                            Total Items
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center print:pr-6">
                            Number of Bags
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center print:pr-0">
                            Cost
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.products.map((product, index) => {
                        return (
                            <tr
                                key={product.product_id}
                                className={`text-default-900 relative text-md print:border-t print:!bg-transparent [&>td]:print:!bg-transparent`}
                            >
                                <td className="py-2 pr-10 top-0 left-0 sticky md:pr-12 pl-6 font-medium print:pl-0  print:pr-6">
                                    {product.product_name}
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start print:pr-6">
                                    {product.measured_per != 1 ? (
                                        <>
                                            <span className="rounded-xl bg-teal-100 px-3 w-fit print:mr-5 border border-slate-500 print:px-0 print:border-none print:bg-transparent">
                                                {parseFloat(
                                                    product.total_dozens || 0
                                                ) +
                                                    parseFloat(
                                                        product.additional_total_dozens ||
                                                            0
                                                    ) || '-'}
                                            </span>
                                            <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                        </>
                                    ) : null}
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start print:pr-6">
                                    <span className="rounded-xl bg-yellow-100 border border-slate-500 px-3 w-fit print:mr-5 print:px-0 print:border-none print:bg-transparent">
                                        {parseFloat(
                                            product.total_quantity || 0
                                        ) +
                                            parseFloat(
                                                product.additional_total_quantity ||
                                                    0
                                            ) || '-'}
                                    </span>
                                    <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start print:pr-6">
                                    {product.measured_per != 1 ? (
                                        <span className="rounded-xl bg-pink-100 border border-slate-500 px-3 w-fit print:mr-5 print:px-0 print:border-none print:bg-transparent">
                                            {parseFloat(
                                                product.total_dozens || 0
                                            )}
                                        </span>
                                    ) : null}

                                    <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start print:pr-0">
                                    <span className="rounded-xl bg-green-100 px-3 w-fit border border-slate-500 print:pr-0 print:px-0 print:border-none print:bg-transparent">
                                        $
                                        {product.cost *
                                            (product.total_dozens ||
                                                product.total_quantity) || '-'}
                                    </span>
                                    <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                            </tr>
                        )
                    })}
                    <tr className={`text-default-900 text-md print:border-t print:!bg-transparent [&>td]:print:!bg-transparent`}>
                        <td className="font-bold py-2 pr-10 md:pr-12 pl-6 print:pl-0 print:pr-6">
                            Totals
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start print:pr-6">
                            <span className="rounded-xl bg-teal-100 px-3 w-fit border-slate-500 border print:mr-5 print:px-0 print:border-none print:bg-transparent">
                                {props.products.reduce((total, product) => {
                                    return total + product.total_dozens
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start print:pr-6">
                            <span className="rounded-xl bg-yellow-100 px-3 w-fit border border-slate-500 print:mr-5 print:px-0 print:border-none print:bg-transparent">
                                {props.products.reduce((total, product) => {
                                    return total + product.total_quantity
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start print:pr-6">
                            <span className="rounded-xl bg-pink-100 px-3 w-fit print:mr-5 print:px-0 border border-slate-500 print:border-none print:bg-transparent">
                                {props.products.reduce((total, product) => {
                                    return total + product.total_dozens
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start print:pr-0">
                            <span className="rounded-xl bg-green-100 px-3 w-fit border border-slate-500 print:mr-5 print:px-0 print:border-none print:bg-transparent">
                                $
                                {props.products.reduce((total, product) => {
                                    return (
                                        total +
                                        product.cost *
                                            (product.total_dozens ||
                                                product.total_quantity)
                                    )
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl bg-white px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
