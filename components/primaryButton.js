import styles from '../styles/primaryButton.module.css'

export default function PrimaryButton({children, clickHandler}) {
    return (
        <button 
        className={styles.primaryButton}
        onClick={clickHandler}
        >
        {children}
        </button>
    )
}