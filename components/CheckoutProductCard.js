import Image from "next/image";
import UpdateCartDropdown from "./UpdateCartDropdown";
import { useState } from "react";

export default function CheckoutProductCard(props) {
    const [toggleAddedToCart, setToggleAddedToCart] = useState("hidden");

    const addingToCart = (e) => {
        e.preventDefault();
        if (props.addToCart(e)) {
            setToggleAddedToCart(!toggleAddedToCart);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h3 className="text-default-900 text-lg text-center pb-1">
                {props.productName}
            </h3>
            <div className="bg-default-100 rounded-md w-56 h-56 relative shadow-lg overflow-hidden">
                <div className="rounded-md">
                    <Image
                        src={`/images/product_images/christmas_products/${props.imgPath}`}
                        objectFit="cover"
                        layout="fill"
                        alt={props.productName}
                    />
                </div>
                <div className="bg-default-900 rounded-md absolute h-8 w-14 left-0 bottom-0 ml-2 mb-2">
                    <p className="text-default-100 text-2xl font-bold text-center">
                        {props.productQty}x
                    </p>
                </div>
                <div className="bg-default-900 rounded-md absolute h-8 w-14 right-0 bottom-0 mr-2 mb-2">
                    <p className="text-default-100 text-2xl font-bold text-center">
                        ${props.totalCost}
                    </p>
                </div>
            </div>
            <UpdateCartDropdown
                handleInputChange={props.handleChange}
                error={props.error}
                name={props.productId}
                measured_per_text={props.measured_per_text}
                price={props.productPrice}
                addingToCart={addingToCart}
                productQty={props.productQty}
                isCheckoutCard={true}
            ></UpdateCartDropdown>
        </div>
    );
}
