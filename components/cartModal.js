import Button from '../components/button';
import Image from 'next/image';

export default function CartModal (props) {
    return (
        <div className={`
            bg-default-100 absolute right-0 top-0 rounded-md shadow-3xl 
            mx-16 my-10 z-20 flex flex-col items-center justify-between w-96 h-[30rem]
        `}>
            <div className="w-full">
                <div className="text-2xl font-bold flex gap-0.5 pt-4 relative h-14 w-full justify-center translate-x-5">
                    <div>CART</div>
                    <div className="pt-0.5 px-2">
                        <Image
                            src="/images/icons/shopping_cart_dark.png"
                            width="24"
                            height="22"
                        />
                    </div>
                    <button className="absolute right-16 top-7" onClick={props.closeCartModal}>
                        <div className="absolute bg-slate-600 rotate-45 w-6 h-0.5"></div>
                        <div className="absolute bg-slate-600 -rotate-45 w-6 h-0.5"></div>
                    </button>
                </div>
                <div className="pt-2 overflow-auto w-full">
                    {Object.keys(props.cart).map((productId) => {
                        return (
                        <div key={productId} className="flex px-4 py-1 justify-between gap-4">
                            <p className="text-lg font-bold">{(props.products.find(product => product.product_id == productId.replace("product_", ""))).product_name}</p>
                            <div className="flex">
                                <button className="bg-default-900 text-xl text-default-100 font-bold rounded-l-md px-3 h-7">-</button>
                                <input 
                                    className="bg-default-900 text-default-100 text-md text-center w-8  h-7 border-x-2" 
                                    type='number'
                                    min='0'
                                    max="999"
                                    defaultValue={props.cart[productId]} 
                                    autoComplete="off"
                                />
                                <button className="bg-default-900 text-xl text-default-100 font-bold rounded-r-md px-3  h-7">+</button>
                            </div>
                        </div>
                        )
                    })}
                </div>
            </div>
            <div className="shadow-top w-full h-14">
                <Button
                    type="primary-md"
                    img="/images/icons/refresh.png"
                >
                    UPDATE CART
                </Button>
            </div>
        </div>
    )
}