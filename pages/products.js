import Link from 'next/link'
import { useRouter } from 'next/router'
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

export default function Products({products}) {
    const [formData, updateFormData] = useState({});
    const [cart, updateCart] = useState({});
    const [itemCosts, updateItemCosts] = useState({});
    const router = useRouter();

    const handleInputChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const addToCart = (e) => {
        e.preventDefault();

        const productId = e.currentTarget.name;
        const itemQuantity = formData[productId];
        const itemCost = e.currentTarget.dataset.price;

        updateCart({
            ...cart,
            [productId]: formData[productId],
        })
        
        updateItemCosts({ ...itemCosts, [productId]: itemCost * itemQuantity });
    }

    const goToCheckout = () => {
        router.push({
            pathname: '/checkout',
            query: {
                ...cart,
            }
        });
    }

    return (
        <div className="font-source-sans-pro h-screen flex flex-col">
            <div className="flex flex-1 flex-col overflow-auto">
                <h2 className="font-bold text-5xl text-center pt-10 pb-5">PRODUCTS</h2>
                <form>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map(product => 
                            <ProductCard 
                                addToCart={addToCart} 
                                handleInputChange={handleInputChange}
                                type="number" 
                                fieldStyle="productInput" 
                                measured_per_text={product.measured_per_text} 
                                price={product.product_price} 
                                imgPath={product.product_img_path} 
                                text={product.product_name} 
                                placeholder="How many?" 
                                name={"product_" + product.product_id} 
                                key={product.product_id}
                            />
                        )}
                    </div>
                </form>
            </div>
            <footer className="bg-default-100 flex flex-row justify-between items-center h-24 shadow-3xl">
                <p className="font-bold text-3xl px-12">
                    Total Cost: ${(Object.values(itemCosts).length ? Object.values(itemCosts).reduce((a, b) => a + b) : 0).toFixed(2)}
                </p>
                <div className="px-12">
                    <Button 
                        type="primary" 
                        clickHandler={goToCheckout}
                        img="/images/icons/shopping_cart.png"
                        >
                        CHECKOUT
                    </Button>
                </div>
            </footer>
        </div>
    )
}
