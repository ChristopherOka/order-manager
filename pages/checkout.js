import FormField from '../components/formField'
import { useState } from 'react';
import { useRouter } from 'next/router';
import * as db from './api/database';

export async function getStaticProps() {
    const products = await db.getAllProductsData();

    return {
        props: {
            products,
        }
    }
}

async function sendFormData(data) {
    //todo: figure out a way to delete customers, orders and order_items if any of the queries fail
    //likely I can do this in a supabase function, so I send all my data at once and parse it on supabase
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

export default function Checkout ({products}) {
    const [formData, updateFormData] = useState({});
    const [emptyFields, updateEmptyFields] = useState({});
    const router = useRouter();

    const data = router.query;

    const handleFocus = (e) => {
        updateEmptyFields({
            ...emptyFields,
            [e.target.name]: false,
        })
    }

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (!validateForm(formData)) {
            alert('Please fill in all required fields');
            return;
        };
        console.log(formData);
        formData.order_cost = totalCost;
        sendFormData(formData);
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

    const formFields = [
        {
            type: 'text',
            name: 'customer_name',
            text: 'Customer Name',
            fieldStyle: 'input',
            required: true,
        },
        {
            type: 'text',
            name: 'email',
            text: 'Email',
            fieldStyle: 'input',
            required: true,
        },
        {
            type: 'number',
            name: 'phone',
            text: 'Phone',
            fieldStyle: 'input',
            required: true,
        },
        {
            type: 'text',
            name: 'address',
            text: 'Address',
            fieldStyle: 'input',
            required: true,
        },
        {
            name: 'city',
            text: 'City',
            fieldStyle: 'select',
            options: ['Mississauga', 'Burlington'],
            required: true,
        },
        {
            name: 'payment_type',
            text: 'Payment Type',
            fieldStyle: 'select',
            options: ['E-Transfer', 'Cash'],
            required: true,
        },
        {
            name: 'delivery_date',
            text: 'Delivery Date',
            fieldStyle: 'select',
            options: ['December 1', 'December 8', 'December 15', 'December 22', 'December 29'],
            required: true,
        },
        {
            type: 'text',
            name: 'additional_information',
            text: 'Additional Information',
            fieldStyle: 'input',
            required: false,
        }
    ]

    return (
        <form>
            {formFields.map((field, index) => {
                return (
                    <FormField 
                        handleFocus={handleFocus}
                        onChange={handleChange}
                        error={emptyFields[field.name]}
                        type={field.type}
                        name={field.name}
                        text={field.text}
                        fieldStyle={field.fieldStyle}
                        options={field.options}
                        required={field.required}
                        key={index}
                    />
                )
            })}
            <p>{JSON.stringify(data)}</p>
            <p>{JSON.stringify(products)}</p>
        </form>
    )
}