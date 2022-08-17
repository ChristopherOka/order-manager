export default function Checkbox(props) {
    return (
        <label className="block relative pl-6 translate-y-[2px] cursor-pointer text-lg select-none">
            <input
                className="peer absolute cursor-pointer opacity-0 h-0 w-0"
                type="checkbox"
                onChange={props.handleInputChange}
                defaultChecked={props.defaultChecked}
            />
            <span className=" border-2 border-red-500 rounded peer-checked:bg-green-400 peer-checked:border-none peer-checked:after:block absolute top-0 left-0 h-6 w-6 after:hidden after:absolute after:left-[8.5px] after:top-[2.5px] after:w-[8px] after:h-[15px] after:border-r-[3px] after:border-b-[3px] after:rotate-45"></span>
        </label>
    );
}
