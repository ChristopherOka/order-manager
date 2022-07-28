import Link from 'next/link'
import PrimaryButton from '../components/primaryButton'
import styles from '../styles/Form.module.css'

export default function Form() {
    return (
        <div>
            <h1 className={styles.title}>Form</h1>
            <h2 className={styles.subtitle}>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </h2>
            <h2 className={styles.subtitle}>Name</h2>
            <input type="text" className={styles.input} />
            <PrimaryButton clickHandler={() => {console.log('test')}}>Submit</PrimaryButton>
        </div>
    )
}