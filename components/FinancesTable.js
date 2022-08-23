export default function FinancesTable(props) {
    return (
        <div className="overflow-auto">
            <table className="rounded-md overflow-hidden">
                <thead>
                    <tr className="text-slate-600 text-left">
                        <th className="font-medium pb-2 pr-12 pl-6 print:pl-0">
                            Material
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center">
                            Quantity
                        </th>
                        <th className="font-medium pb-2 pr-12 text-center">
                            Cost
                        </th>
                        <th>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.materials.map((material, index) => {
                        return (
                            <tr
                                key={material.item_id}
                                className={`text-default-900 text-md print:border-t group`}
                            >
                                <td className="py-2 pr-10 md:pr-12 pl-6 font-medium print:pl-0">
                                    {material.material_name}
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start">
                                    <span className="rounded-xl bg-teal-100 px-3 w-fit print:mr-5 print:px-0">
                                        {material.quantity || "-"}
                                    </span>
                                    <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start">
                                    <span className="rounded-xl bg-green-100 px-3 w-fit print:mr-5 print:px-0">
                                        ${material.cost || "-"}
                                    </span>
                                    <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                                <td>
                                    <button className="invisible group-hover:visible rounded-md bg-default-900 relative px-3 py-3 mr-2">
                                        <div className="absolute bg-default-100 w-[3px] h-3 top-[6px] left-[11px]"></div>
                                        <div className="absolute rotate-90 bg-default-100 w-[3px] h-3 top-[6px] left-[11px]"></div>
                                    </button>
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
                                {props.materials.reduce((total, material) => {
                                    return total + material.quantity;
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start">
                            <span className="rounded-xl bg-green-100 px-3 w-fit print:mr-5 print:px-0">
                                ${props.materials.reduce((total, material) => {
                                    return total + material.cost;
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
