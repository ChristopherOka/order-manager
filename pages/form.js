import Link from 'next/link'
import Button from '../components/button'
import FormField from '../components/formField'
import ProductCard from '../components/productCard'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as db from './api/database';


export async function getServerSideProps() {
    const products = await db.getAllProductsData();

    return {
        props: {
            products,
        }
    }
}

async function sendFormData(data) {
    //todo: figure out a way to delete customers, orders and order_items if any of the queries fail
    let customerData = {}
    let orderData = {}
    let orderDataProps = ['additional_information', 'delivery_date', 'order_cost', 'payment_type']
    let orderItems = {}

    for (let key in data) {
        if (key.startsWith('product_')) {
           orderItems[key.replace('product_', '')] = data[key]
        }
        else if (orderDataProps.includes(key)){
            if (key === 'delivery_date') {
                data.delivery_date = new Date(data.delivery_date);
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
    await db.insertNewCustomer(customerData);

    const order_uid = uuidv4();
    orderData.order_uid = order_uid;
    orderData.customer_uid = customer_uid;
    await db.insertNewOrder(orderData);

    let orderItemsData = []
    for (let key in orderItems) {
        orderItemsData.push({
            order_uid,  
            product_id: key,
            quantity: orderItems[key],
            order_item_uid: uuidv4(),
        });
    }
    db.insertNewOrderItems(orderItemsData);
    //delete recent customer and order if any of the queries fail
}

export default function Form({products}) {
    const [formData, updateFormData] = useState({});
    const [itemCosts, updateItemCosts] = useState({});
    const [emptyFields, updateEmptyFields] = useState({});

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
        updateEmptyFields({});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm(formData)) {
            alert('Please fill in all required fields');
            return;
        };
        console.log(formData);
        formData.order_cost = totalCost;
        sendFormData(formData);
    }

    const handleProductChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
        const itemCost = e.target.dataset.price;
        const itemQuantity = e.target.value;
        updateItemCosts({ ...itemCosts, [e.target.name]: itemCost * itemQuantity });
    }

    const handleFocus = (e) => {
        updateEmptyFields({
            ...emptyFields,
            [e.target.name]: false,
        })
    }

    const validateForm = () => {
        const requiredFields = ['customer_name', 'email', 'phone', 'address', 'city', 'delivery_date', 'payment_type'];   
        let isValid = true;
        let newEmptyFields = {};
        
        for (const field of requiredFields) {
            if (!formData[field]) {
                newEmptyFields = {...newEmptyFields, [field]: true};
                isValid = false;
            }
        }
        updateEmptyFields({...emptyFields, ...newEmptyFields});

        return isValid;
    }

    return (
        <div className="font-source-sans-pro">
            <h2 className="font-bold text-5xl text-center pt-10">PRODUCTS</h2>
            <form>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map(product => <ProductCard onChange={handleProductChange} type="number" fieldStyle="productInput" measured_per_text={product.measured_per_text} price={product.product_price} imgPath={product.product_img_path} text={product.product_name} placeholder="How many?" name={"product_" + product.product_id} key={product.product_id}/>)}
                    <Button type="primary" clickHandler={handleSubmit}>Place Order</Button>
                    <FormField handleFocus={handleFocus} onChange={handleChange} error={emptyFields['customer_name']} type='text' fieldStyle="input" text="Name" placeholder="Enter your name" name="customer_name" required={true}/>
                    <FormField handleFocus={handleFocus} onChange={handleChange} error={emptyFields['email']} type='text' fieldStyle="input"  text="Email" placeholder="Enter your email" name="email" required={true}/>
                    <FormField handleFocus={handleFocus} onChange={handleChange} error={emptyFields['phone']} type='number' fieldStyle="input" text="Phone" placeholder="Enter your phone" name="phone" required={true}/>
                    <FormField handleFocus={handleFocus} onChange={handleChange} error={emptyFields['city']} fieldStyle="select" options={['Mississauga', 'Burlington']} text="City" placeholder="Enter your city" name="city" required={true}/>
                    <FormField handleFocus={handleFocus} onChange={handleChange} error={emptyFields['address']} type='text' fieldStyle="input" text="Address" placeholder="Enter your address" name="address" required={true}/>
                    <FormField handleFocus={handleFocus} onChange={handleChange} error={emptyFields['payment_type']} fieldStyle="select" options={['Cash', 'E-Transfer']} text="Payment Type" placeholder="Enter your payment type" name="payment_type" required={true}/>
                    <FormField handleFocus={handleFocus} onChange={handleChange} error={emptyFields['delivery_date']} fieldStyle="select" options={['December 9 2022', 'December 16 2022', 'December 23 2022']} text="Delivery Date" placeholder="Enter your delivery date" name="delivery_date" required={true}/>
                    <FormField onChange={handleChange} type='text' fieldStyle="input" text="Additional Information" placeholder="Enter any additional information" name="additional_information"/>
                </div>
            </form>
            <h1>Form</h1>
            <h2 className="text-3xl font-bold">
                <Link href="/">
                    <a>Home</a>
                </Link>
            </h2>
            <h3><span style={{color: "red"}}>*</span> Required</h3>
            <h3>Total Cost: ${(Object.values(itemCosts).length ? Object.values(itemCosts).reduce((a, b) => a + b) : 0).toFixed(2)}</h3>
        </div>
    )
}