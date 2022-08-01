import { useRouter } from 'next/router';
import Button from '../components/button';
import ProductCard from '../components/productCard';
import CartModal from '../components/cartModal';
import { useState } from 'react';
import Image from 'next/image';
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
    const [cartModalState, updateCartModalState] = useState(false);
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

    const openCartModal = () => {
        updateCartModalState(true);
        console.log(products);
        console.log(products.find(product => product.product_id == 'product_3'));
    }

    const closeCartModal = () => {
        if  (cartModalState) {
            updateCartModalState(false);
        }
    }


    return (
        <div className="font-source-sans-pro h-screen flex flex-col" onClick={closeCartModal}>
            <div className="flex flex-1 flex-col overflow-auto">
                <div>
                    <h2 className="font-bold text-5xl text-center pt-10 pb-5">PRODUCTS</h2>
                    <div className="absolute right-0 top-0 px-16 py-10 z-10">
                        <div className="relative">
                            <Button
                                type="secondary"
                                img="/images/icons/shopping_cart.png"
                                clickHandler={openCartModal}
                            >
                                View Cart
                            </Button>
                            {Object.keys(cart).length ? (
                            <div className={`bg-default-900 text-default-100 font-bold text-center 
                            rounded-full absolute px-[0.4rem] h-5 top-0 right-0 
                            translate-x-2 -translate-y-2 animate-popIn
                            `}>
                                <p className="-translate-y-0.5 animate-delayAppear">{Object.keys(cart).length}</p>
                            </div>
                            ) : null}
                        </div>
                    </div>
                    {cartModalState ? (<CartModal 
                        closeCartModal={closeCartModal}
                        cart={cart}
                        products={products}
                    />) : null}
                </div>
                
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
