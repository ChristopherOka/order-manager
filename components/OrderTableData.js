import Image from "next/image";

export default function OrderTableData(props) {
    return (
        <div className="flex group justify-between items-center px-4 py-2 whitespace-nowrap gap-3 min-w-max">
            <div id={`${props.uid}-${props.col_name}-text-well`} className="flex justify-start">
                <span className={`${props.prepend ? "inline" : "hidden"}`}>
                    {props.prepend}
                </span>
                <div
                    id={`${props.uid}-${props.col_name}-text`}
                    className={`${
                        props.popout ? "truncate max-w-[10rem]" : ""
                    }`}
                >
                    {props.children}
                </div>
            </div>
            {props.popout ? (
                <textarea
                    id={`${props.uid}-${props.col_name}-input`}
                    className="hidden w-full bg-slate-200 rounded-md px-1 min-h-max min-w-[20rem]"
                    type={props.type}
                    onChange={props.changeTextAreaHeight}
                ></textarea>
            ) : (
                <input
                    id={`${props.uid}-${props.col_name}-input`}
                    className="hidden w-full bg-slate-200 rounded-md px-1"
                    type={props.type}
                />
            )}
            <button
                id={`${props.uid}-${props.col_name}-edit`}
                className={`transition-opacity flex opacity-0 group-hover:opacity-100 ${
                    props.readOnly ? "hidden" : ""
                }`}
                onClick={props.editTableData}
                data-uid={props.uid}
                data-customer_uid={props.customer_uid}
                data-col_name={props.col_name}
            >
                <Image
                    src="/images/icons/square_edit.png"
                    height="24"
                    width="24"
                />
            </button>
            <div
                id={`${props.uid}-${props.col_name}-btns`}
                className="hidden flex gap-1 min-w-fit"
            >
                <button
                    onClick={props.saveTableEdit}
                    data-uid={props.uid}
                    data-customer_uid={props.customer_uid}
                    data-col_name={props.col_name}
                >
                    <Image
                        src="/images/icons/black_checkmark.png"
                        height="24"
                        width="24"
                    />
                </button>
                <button
                    onClick={props.cancelTableEdit}
                    data-uid={props.uid}
                    data-customer_uid={props.customer_uid}
                    data-col_name={props.col_name}
                >
                    <Image
                        src="/images/icons/black_x.png"
                        height="24"
                        width="24"
                    />
                </button>
            </div>
        </div>
    );
}
