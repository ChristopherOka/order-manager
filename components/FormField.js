export default function FormField(props) {
    let formField = <></>;
    switch (props.fieldStyle) {
        case "input":
            formField = (
                <input
                    onChange={
                        props.customChangeHandler
                            ? props.customChangeHandler
                            : props.onChange
                    }
                    onFocus={props.handleFocus}
                    className={`
                        rounded bg-zinc-200 px-2 text-xl text-slate-700 w-full h-10
                        ${props.error ? "border-red-400 border-2" : ""}`}
                    type={props.type}
                    min={props.min}
                    max={props.max}
                    placeholder={props.placeholder}
                    name={props.name}
                    data-price={props.price}
                />
            );
            break;
        case "select":
            formField = (
                <select
                    onFocus={props.handleFocus}
                    onChange={
                        props.customChangeHandler
                            ? props.customChangeHandler
                            : props.onChange
                    }
                    name={props.name}
                    className={`bg-zinc-200 rounded text-xl px-2 w-full h-10 appearance-none bg-dropdown-arrow bg-no-repeat bg-right bg-origin-content ${
                        props.error ? "border-red-400 border-2" : ""
                    }`}
                >
                    <option value=""></option>
                    {props.options.map((option) => (
                        <option
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.text}
                        </option>
                    ))}
                </select>
            );
            break;
        case "textarea":
            formField = (
                <textarea
                    onChange={props.onChange}
                    onFocus={props.handleFocus}
                    className={`bg-zinc-200 rounded px-2 text-xl w-full h-full resize-none ${
                        props.error ? "border-red-200" : ""
                    }`}
                    name={props.name}
                />
            );
            break;
        default:
            break;
    }

    return (
        <div id={props.name} className={`mt-3 ${props.hidden ? "hidden" : ""}`}>
            <h4 className="text-xl">
                {props.text}{" "}
                {props.required ? (
                    <span style={{ color: "red" }}>*</span>
                ) : null}
            </h4>
            {props.imgPath ? <img src={props.imgPath}></img> : null}
            {formField}
            <p className="text-red-500 text-sm">{props.description}</p>
        </div>
    );
}
