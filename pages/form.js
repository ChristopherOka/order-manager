import Link from 'next/link'
import Button from '../components/button'
import FormField from '../components/formField'
import styles from '../styles/Form.module.css'

function submitForm() {

}

export default function Form() {
    return (
        <div>
            <h1 className={styles.title}>Form</h1>
            <h2 className={styles.subtitle}>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </h2>
            <form>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <FormField type="input" text="Name" placeholder="Enter your name" required={true}/>
                    <FormField type="input"  text="Email" placeholder="Enter your email" required={true}/>
                    <FormField type="input" text="Phone" placeholder="Enter your phone" required={true}/>
                    <FormField type="select" options={['Mississauga', 'Burlington']} text="City" placeholder="Enter your city" required={true}/>
                    <FormField type="input" text="Address" placeholder="Enter your address" required={true}/>
                    <FormField type="input" text="Additional Information" placeholder="Enter your any additional information" />
                    <Button type="primary" clickHandler={submitForm}>Submit</Button>
                </div>
            </form>
        </div>
    )
}