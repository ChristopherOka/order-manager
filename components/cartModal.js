import Button from '../components/button';
import Image from 'next/image';

export default function CartModal (props) {
    return (
        <div id="cartModal" className={`
            bg-default-100 absolute right-0 top-0 rounded-md shadow-3xl 
            mx-16 my-10 w-96 h-[30rem] origin-top-right z-20
            ${props.cartModalState == 'open' ? 'animate-modalAppear' : props.cartModalState == 'closed' ? 'animate-modalDisappear': 'hidden'}
            `}
            >
            <div className="text-3xl font-bold flex flex-col pt-4 relative h-20 w-full align-start items-center">
                <div className="flex">
                    <div>CART</div>
                    <div className="pt-px px-1">
                        <Image
                            src="/images/icons/shopping_cart_dark.png"
                            width="24"
                            height="22"
                        />
                    </div>
                </div>
                <p className="text-lg text-slate-600 font-normal -m-1">Total Cost: ${(Object.values(props.itemCosts).length ? Object.values(props.itemCosts).reduce((a, b) => a + b) : 0).toFixed(2)}</p>
                <button className="absolute right-10 top-4 h-6 w-6" onClick={props.closeCartModal}>
                    <div className="absolute bg-slate-600 rotate-45 w-6 h-0.5"></div>
                    <div className="absolute bg-slate-600 -rotate-45 w-6 h-0.5"></div>
                </button>
            </div>
            <div className="pt-8 overflow-auto w-full h-[21.5rem]" key={props.cartKey}>
                {Object.keys(props.cart).length ? Object.keys(props.cart).map((productId) => {
                    return (
                    <div key={productId} className="flex px-4 py-2 justify-between gap-4">
                        <p className="text-lg font-bold">{(props.products.find(product => product.product_id == productId.replace("product_", ""))).product_name}</p>
                        <div className="flex">
                            <button 
                                className="bg-default-900 text-xl text-default-100 font-bold rounded-l-md px-3 h-7" 
                                name={productId}
                                onClick={() => {props.changeCartItemQty(productId, -1)}}
                            >-</button>
                            <input 
                                className="bg-default-900 text-default-100 text-md text-center w-8  h-7 border-x" 
                                name={productId}
                                inputMode="numeric"
                                maxLength="3"
                                defaultValue={props.cart[productId]}
                                onChange={props.editCartItem}
                                autoComplete="off"
                            />
                            <button 
                                className="bg-default-900 text-xl text-default-100 font-bold rounded-r-md px-3 h-7" 
                                onClick={() => {props.changeCartItemQty(productId, 1)}}
                            >+</button>
                        </div>
                    </div>
                    )
                }) : <div className="text-xl px-4 py-4 text-center">Your cart is empty</div>}
            </div>
            <div className="shadow-top w-full h-14">
                <Button
                    type="primary-md"
                    img="/images/icons/refresh.png"
                    clickHandler={props.updateCartFormEdit}
                >
                    UPDATE CART
                </Button>
            </div>
        </div>
    )
}