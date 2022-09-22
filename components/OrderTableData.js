export default function OrderTableData(props) {
    return (
        <div className="flex group justify-between items-center px-4 py-2 whitespace-nowrap gap-3 min-w-max">
            <div
                id={`${props.uid}-${props.col_name}-text-well`}
                className="flex justify-start"
            >
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
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 12C0 5.37258 5.37258 0 12 0H52C58.6274 0 64 5.37258 64 12V52C64 58.6274 58.6274 64 52 64H12C5.37258 64 0 58.6274 0 52V12Z"
                        fill="#161616"
                    />
                    <path
                        d="M48.6667 49H15.3333V42.8333H48.6667V49ZM33.7667 20.0012L40.0167 25.7825L24.9167 39.75H18.6667V33.9687L33.7667 20.0012ZM41.8 24.1329L35.55 18.3517L38.6 15.5304C38.7542 15.3875 38.9373 15.2741 39.139 15.1967C39.3406 15.1194 39.5567 15.0796 39.775 15.0796C39.9933 15.0796 40.2094 15.1194 40.411 15.1967C40.6127 15.2741 40.7958 15.3875 40.95 15.5304L44.85 19.1379C45.5 19.7392 45.5 20.7104 44.85 21.3117L41.8 24.1329Z"
                        fill="#FAFAFA"
                    />
                </svg>
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
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 53 53"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="53" height="53" rx="8" fill="#161616" />
                        <path
                            d="M12 26.5L23.625 39L43 14"
                            stroke="#22DF03"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <button
                    onClick={props.cancelTableEdit}
                    data-uid={props.uid}
                    data-customer_uid={props.customer_uid}
                    data-col_name={props.col_name}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 53 53"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width="53" height="53" rx="8" fill="#161616" />
                        <path
                            d="M12.7249 12L41 41M12 41L40.2751 12"
                            stroke="#F00101"
                            strokeWidth="4"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
