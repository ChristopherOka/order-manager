export default function EmailModal(props) {
    return (
        <div
            className="absolute flex justify-center w-full h-full z-50"
            onClick={props.closeCallback}
        >
            <div
                className="bg-default-100 rounded-md shadow-box flex flex-col gap-8 h-fit p-10 mt-10"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <h2 className="text-default-900 text-3xl text-center font-bold">
                    {props.header}
                </h2>
                <div
                    className="text-default-900 text-xl text-center"
                    dangerouslySetInnerHTML={{
                        __html: props.body,
                    }}
                ></div>
                <div className="flex gap-12 pt-4">
                    <button
                        className="bg-default-900 text-default-100 rounded-md px-12 py-3 text-2xl"
                        onClick={props.closeCallback}
                    >
                        BACK
                    </button>
                    <button
                        className="bg-green-600 text-default-100 rounded-md px-12 py-3 text-2xl"
                        onClick={props.sendEmailCallback}
                    >
                        SEND
                    </button>
                </div>
            </div>
        </div>
    );
}
