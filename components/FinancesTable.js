import Image from "next/image";
import * as db from "../pages/api/database";

export default function FinancesTable(props) {
    const editMaterial = (material_uid) => {
        const editBtn = document.getElementById(`${material_uid}-edit`);
        const inputs = document.getElementById(`${material_uid}-inputs`);
        const buttons = document.getElementById(`${material_uid}-buttons`);
        editBtn.classList.add("hidden");
        inputs.classList.remove("hidden");
        buttons.classList.remove("hidden");
    };

    const cancelEdit = (material_uid) => {
        const editBtn = document.getElementById(`${material_uid}-edit`);
        const inputs = document.getElementById(`${material_uid}-inputs`);
        const buttons = document.getElementById(`${material_uid}-buttons`);
        editBtn.classList.remove("hidden");
        inputs.classList.add("hidden");
        buttons.classList.add("hidden");
    };

    const saveEdit = async (material_uid) => {
        const quantityInput = document.getElementById(
            `${material_uid}-quantity`
        );
        const quantity = quantityInput.value;
        const costInput = document.getElementById(`${material_uid}-cost`);
        const cost = costInput.value;

        if (!cost) {
            costInput.style.border = "1px solid red";
        }
        if (!quantity) {
            quantityInput.style.border = "1px solid red";
        }
        if (!cost || !quantity) {
            return;
        }

        await db.addMaterialQuantity(material_uid, quantity, cost);
        const quantityText = document.getElementById(
            `${material_uid}-quantity-text`
        );
        const costText = document.getElementById(`${material_uid}-cost-text`);
        const totalsQuantityText = document.getElementById(
            "totals-quantity-text"
        );
        const totalsCostText = document.getElementById("totals-cost-text");
        quantityText.innerText =
            parseFloat(quantityText.innerText) + parseFloat(quantity);
        costText.innerText =
            "$" +
            (parseFloat(costText.innerText.substring(1)) + parseFloat(cost));
        totalsQuantityText.innerText =
            parseFloat(totalsQuantityText.innerText) + parseFloat(quantity);
        totalsCostText.innerText =
            "$" +
            (parseFloat(totalsCostText.innerText.substring(1)) +
                parseFloat(cost));

        cancelEdit(material_uid);
    };

    const removeBorder = (e) => {
        e.currentTarget.style.border = "none";
    };

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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {props.materials.map((material, index) => {
                        return (
                            <tr
                                key={material.material_uid}
                                className={`text-default-900 text-md print:border-t group`}
                            >
                                <td className="py-2 pr-10 md:pr-12 pl-6 font-medium print:pl-0">
                                    {material.material_name}
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start">
                                    <span
                                        id={`${material.material_uid}-quantity-text`}
                                        className="rounded-xl bg-teal-100 px-3 w-fit print:mr-5 print:px-0"
                                    >
                                        {material.quantity || "0"}
                                    </span>
                                    <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                                <td className="pr-12 font-bold text-center print:text-start">
                                    <span
                                        id={`${material.material_uid}-cost-text`}
                                        className="rounded-xl bg-green-100 px-3 w-fit print:mr-5 print:px-0"
                                    >
                                        ${material.cost || "0"}
                                    </span>
                                    <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                                </td>
                                <td className="flex justify-start items-end print:hidden">
                                    <div>
                                        <button
                                            id={`${material.material_uid}-edit`}
                                            className="invisible group-hover:visible rounded-md bg-default-900 relative h-6 w-6 -ml-6"
                                            onClick={() => {
                                                editMaterial(
                                                    material.material_uid
                                                );
                                            }}
                                        >
                                            <div className="absolute bg-default-100 w-[3px] h-3 top-[6px] left-[11px]"></div>
                                            <div className="absolute rotate-90 bg-default-100 w-[3px] h-3 top-[6px] left-[11px]"></div>
                                        </button>
                                    </div>

                                    <div
                                        id={`${material.material_uid}-inputs`}
                                        className="hidden flex gap-3 -ml-5 py-2"
                                    >
                                        <div className="flex flex-col">
                                            <label className="font-bold text-sm">
                                                Quantity
                                            </label>
                                            <input
                                                id={`${material.material_uid}-quantity`}
                                                className="rounded bg-zinc-200 px-2 text-lg text-slate-700 w-16 h-6"
                                                onFocus={removeBorder}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <label className="font-bold text-sm">
                                                Cost
                                            </label>
                                            <input
                                                id={`${material.material_uid}-cost`}
                                                className="rounded bg-zinc-200 px-2 text-lg text-slate-700 w-16 h-6"
                                                onFocus={removeBorder}
                                            />
                                        </div>
                                    </div>
                                    <div
                                        id={`${material.material_uid}-buttons`}
                                        className="hidden pl-2 flex gap-2 justify-start items-end py-[0.6rem]"
                                    >
                                        <button
                                            className="rounded bg-default-900 h-7 w-7 flex justify-center items-center"
                                            onClick={() => {
                                                saveEdit(material.material_uid);
                                            }}
                                        >
                                            <Image
                                                src="/images/icons/plus.png"
                                                width="16"
                                                height="16"
                                            />
                                        </button>
                                        <button
                                            className="rounded bg-default-900 h-7 w-7 flex justify-center items-center"
                                            onClick={() => {
                                                cancelEdit(
                                                    material.material_uid
                                                );
                                            }}
                                        >
                                            <Image
                                                src="/images/icons/red_x.png"
                                                width="16"
                                                height="16"
                                            />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                    <tr className={`text-default-900 text-md print:border-t`}>
                        <td className="font-bold py-2 pr-10 md:pr-12 pl-6 print:pl-0">
                            Totals
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start">
                            <span
                                id="totals-quantity-text"
                                className="rounded-xl bg-teal-100 px-3 w-fit print:mr-5 print:px-0"
                            >
                                {props.materials.reduce((total, material) => {
                                    return total + material.quantity;
                                }, 0)}
                            </span>
                            <span className="hidden rounded-xl px-5 py-3 border-slate-400 border float-right print:inline"></span>
                        </td>
                        <td className="pr-12 font-bold text-center print:text-start">
                            <span
                                id="totals-cost-text"
                                className="rounded-xl bg-green-100 px-3 w-fit print:mr-5 print:px-0"
                            >
                                $
                                {props.materials.reduce((total, material) => {
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
