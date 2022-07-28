import styles from '../styles/formField.module.css'

export default function FormField (props) {
    let formField;
    if (props.type === 'input') {
        formField = <input className={styles.input} type="text" placeholder={props.placeholder} required={props.required}/>
    } else if (props.type === 'select') {
        formField = <select className={styles.select}>
            <option value="">- select an option -</option>
            {props.options.map(option =>  <option>{option}</option>)}
        </select>
    }
    return (
        <>
            <label className={styles.label}>{props.text}</label>
            {formField}
        </>
    )

}