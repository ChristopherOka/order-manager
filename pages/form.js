import Link from 'next/link'
import Button from '../components/button'
import FormField from '../components/formField'
import { useState } from 'react'
import supabase from '../utils/supabase'
import styles from '../styles/form.module.css'

export async function getStaticProps() {
    const { data: products, error } = await supabase.from('products').select('*').order('product_id', 'asc');

    if (error) {
        console.log(error);
    }

    return {
        props: {
            products,
        }
    }
}


export default function Form({products}) {
    const [formData, updateFormData] = useState();

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //call function to insert order into orders table
    }


    return (
        <div>
            <h1 className={styles.title}>Form</h1>
            <h2 className={styles.subtitle}>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </h2>
            <form>
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}>
                    <FormField onChange={handleChange} type="input" text="Name" placeholder="Enter your name" name="name" required={true}/>
                    <FormField onChange={handleChange} type="input"  text="Email" placeholder="Enter your email" name="email" required={true}/>
                    <FormField onChange={handleChange} type="input" text="Phone" placeholder="Enter your phone" name="phone" required={true}/>
                    <FormField onChange={handleChange} type="select" options={['Mississauga', 'Burlington']} text="City" placeholder="Enter your city" name="city" required={true}/>
                    <FormField onChange={handleChange} type="input" text="Address" placeholder="Enter your address" name="address" required={true}/>
                    <FormField onChange={handleChange} type="input" text="Additional Information" placeholder="Enter any additional information" name="additional-information"/>
                    {products.map(product => <FormField onChange={handleChange} type="input" text={product.product_name} placeholder="How many?" name={product.product_id} key={product.product_id}/>)}
                    <Button type="primary" clickHandler={handleSubmit}>Submit</Button>
                </div>
            </form>
        </div>
    )
}