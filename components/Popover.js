import { useState } from "react";

const Popover = (props) => {
    const [popOverState, updatePopOverState] = useState(false);
    const [popoverExists, updatePopoverExists] = useState(false);

    const togglePopOverState = () => {
        if (popOverState === "open") {
            closePopover();
        } else {
            updatePopOverState("open");
            updatePopoverExists(true);
        }
    };

    const closePopover = () => {
        updatePopOverState("closed");
        setTimeout(() => {
            updatePopOverState(false);
        }, 250);
    };

    return (
        <div className={`relative ${popoverExists ? " z-[9999]" : ""}`}>
            <div
                className={`${
                    popOverState == "open"
                        ? "animate-fadeIn"
                        : popOverState == "closed"
                        ? "animate-fadeOut"
                        : "hidden"
                }`}
            >
                <div className="bg-default-900 text-default-100 rounded-md p-4 whitespace-nowrap absolute left-1/2 -translate-x-1/2 -mt-[5.2rem]">
                    {props.content}
                </div>
                <div
                    className={`${
                        popoverExists ? "" : "hidden"
                    } absolute border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-default-900 w-0 h-0 left-1/2 -translate-x-1/2 z-50 -mt-8`}
                ></div>
            </div>
            <div
                onMouseEnter={togglePopOverState}
                onMouseLeave={closePopover}
                onClick={togglePopOverState}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Popover;
