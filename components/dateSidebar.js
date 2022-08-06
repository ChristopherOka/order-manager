export default function DateSidebar(props) {
    const dates = ["All", "1st", "8th", "15th", "22nd", "29th"];

    return (
        <div className="absolute top-0 left-0 h-full w-28 flex flex-col justify-center">
            <div className="flex flex-col items-center justify-around w-full h-full my-36 rounded-tr-md rounded-br-md  bg-default-100 shadow-3xl">
                {dates.map((date) => {
                    return (
                        <a className="cursor-pointer py-6 w-full">
                            <h3 className="text-default-900 font-bold text-3xl text-center pb-1">
                                {date}
                            </h3>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}
