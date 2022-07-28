import styles from '../styles/button.module.css'

export default function Button(props) {
    let buttonStyle;
    switch(props.type) {
        case 'primary': 
            buttonStyle = styles.primary;
            break;
        case 'secondary':
            buttonStyle = styles.secondary;
            break;
        case 'tertiary':
            buttonStyle = styles.tertiary;
            break;
        default:
            buttonStyle = styles.primary;
    }
    return (
        <button 
        className={buttonStyle}
        onClick={props.clickHandler}
        >
        {props.children}
        </button>
    )
}