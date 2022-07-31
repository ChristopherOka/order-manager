import Image from 'next/image';

export default function FormField (props) {

    let formField = <></>;
    switch (props.fieldStyle) {
        case 'input':
            formField = <input 
                onChange={props.onChange} 
                onFocus={props.handleFocus}
                className={"rounded bg-default-100 border-none" + ' ' + (props.error ? 'border-red-200' : '')} 
                type={props.type}
                min={props.type === 'number' ? 0 : null}
                placeholder={props.placeholder} 
                name={props.name} 
                data-price={props.price}
                />
            break;
        case 'select':
            formField = <select onFocus={props.handleFocus} onChange={props.onChange} name={props.name} className={(props.error ? 'border-red' : '')}>
                <option value="">- select an option -</option>
                {props.options.map(option =>  <option key={option}>{option}</option>)}
            </select>
            break;
    }

    return (
        <div>
            <h4>{props.text} {props.required ? <span style={{color: "red"}}>*</span> : null}</h4>
            <label>{props.measured_per_text ? `Price Per ${props.measured_per_text}: $${props.price}`: null}</label>
            {props.imgPath ? <img src={props.imgPath}></img> : null}
            {formField}
        </div>
    )

}