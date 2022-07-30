import styles from '../styles/formField.module.css'

export default function FormField (props) {
    let formField;
    if (props.fieldStyle === 'input') {
        formField = <input 
        onChange={props.onChange} 
        className={styles.input} 
        type={props.type}
        min={props.type === 'number' ? 0 : null}
        placeholder={props.placeholder} 
        name={props.name} 
        data-price={props.price}
        required={props.required}
        />
    } else if (props.fieldStyle === 'select') {
        formField = <select onChange={props.onChange} name={props.name} className={styles.select}>
            <option value="">- select an option -</option>
            {props.options.map(option =>  <option key={option}>{option}</option>)}
        </select>
    }
    return (
        <div className={styles.formField}>
            <label className={styles.label}>{props.text}</label>
            <label className={styles.label}>Price per {props.measured_per}: ${props.price}</label>
            {formField}
        </div>
    )

}