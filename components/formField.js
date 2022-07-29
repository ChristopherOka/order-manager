import styles from '../styles/formField.module.css'

export default function FormField (props) {
    let formField;
    if (props.type === 'input') {
        formField = <input onChange={props.onChange} className={styles.input} type="text" placeholder={props.placeholder} name={props.name} required={props.required}/>
    } else if (props.type === 'select') {
        formField = <select onChange={props.onChange} className={styles.select}>
            <option name={props.name} value="">- select an option -</option>
            {props.options.map(option =>  <option key={option}>{option}</option>)}
        </select>
    }
    return (
        <div className={styles.formField}>
            <label className={styles.label}>{props.text}</label>
            {formField}
        </div>
    )

}