import Link from 'next/link'
import Button from '../components/button'
import FormField from '../components/formField'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import supabase from '../utils/supabase'
import styles from '../styles/form.module.css'

export async function getStaticProps() {
    const { data: products, error } = await supabase.from('products').select('*').order('product_id', 'asc');
    const { data: orders, error: error2 } = await supabase.from('orders').select('*');

    if (error) {
        console.log(error);
    }
    if (error2) {
        console.log(error2);
    }

    return {
        props: {
            products,
            orders,
        }
    }
}

async function sendFormData(data) {
    let customerData = {}
    let orderData = {}
    let orderDataProps = ['additional_information', 'order_date', 'order_cost', 'payment_type']
    let orderItems = {}

    data['address'] = data['address'] + ', ' + data['city'];
    delete data['city'];

    for (let key in data) {
        if (key.startsWith('product_')) {
           orderItems[key.replace('product_', '')] = data[key]
        }
        else if (orderDataProps.includes(key)){
            if (key === 'order_date') {
                data.order_date = new Date(data.order_date);
            }
            orderData[key] = data[key]
        }
        else {
            customerData[key] = data[key]
        }
    }
    console.log('Data', data)
    console.log('Customer data: ', customerData)
    console.log('Order data: ', orderData)
    console.log('Order items: ', orderItems)

    const customer_uid = uuidv4();
    customerData.customer_uid = customer_uid;
    await insertNewCustomer(customerData);

    const order_uid = uuidv4();
    orderData.order_uid = order_uid;
    orderData.customer_uid = customer_uid;
    await insertNewOrder(orderData);

    let orderItemsData = []
    for (let key in orderItems) {
        orderItemsData.push({
            order_uid,  
            product_id: key,
            quantity: orderItems[key],
            order_item_uid: uuidv4(),
        });
    }
    insertNewOrderItems(orderItemsData);
}

async function insertNewCustomer(data) {
    const { data: response, error } = await supabase.from('customers').insert(data);

    if (error) {
        console.log(error);
    }

    return response;
}

async function insertNewOrder(data) {
    const { data: response, error } = await supabase.from('orders').insert(data);

    if (error) {
        console.log(error);
    }

    return response;
}

async function insertNewOrderItems(data) {
    const { data: response, error } = await supabase.from('order_items').insert(data);

    if (error) {
        console.log(error);
    }

    return response;
}


export default function Form({products, orders}) {
    const [formData, updateFormData] = useState();
    const [totalCost, updateTotalCost] = useState(0);

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        formData.order_cost = totalCost;
        sendFormData(formData);
    }

    const handleProductChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
        //need to update cost when value is subtracted
        //this is totally whack but is used for testing purposes
        updateTotalCost(totalCost + parseInt(e.target.value) * parseInt(e.target.dataset.price))
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
                    <FormField onChange={handleChange} type="input" text="Name" placeholder="Enter your name" name="customer_name" required={true}/>
                    <FormField onChange={handleChange} type="input"  text="Email" placeholder="Enter your email" name="email" required={true}/>
                    <FormField onChange={handleChange} type="input" text="Phone" placeholder="Enter your phone" name="phone" required={true}/>
                    <FormField onChange={handleChange} type="select" options={['Mississauga', 'Burlington']} text="City" placeholder="Enter your city" name="city" required={true}/>
                    <FormField onChange={handleChange} type="input" text="Address" placeholder="Enter your address" name="address" required={true}/>
                    <FormField onChange={handleChange} type="select" options={['Cash', 'E-Transfer']} text="Payment Type" placeholder="Enter your payment type" name="payment_type" required={true}/>
                    <FormField onChange={handleChange} type="select" options={['December 9 2022', 'December 16 2022', 'December 23 2022']} text="Order Date" placeholder="Enter your order date" name="order_date" required={true}/>
                    <FormField onChange={handleChange} type="input" text="Additional Information" placeholder="Enter any additional information" name="additional_information"/>
                    {products.map(product => <FormField onChange={handleProductChange} type="input" measured_per={product.measured_per} price={product.product_price} text={product.product_name} placeholder="How many?" name={"product_" + product.product_id} key={product.product_id}/>)}
                    <Button type="primary" clickHandler={handleSubmit}>Submit</Button>
                </div>
            </form>
            <p>{JSON.stringify(orders)}</p>
        </div>
    )
}