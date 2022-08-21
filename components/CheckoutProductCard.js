import Image from "next/image";

export default function CheckoutProductCard(props) {
    return (
        <div className="flex flex-col items-center">
            <h3 className="text-default-900 text-lg text-center pb-1">
                {props.productName}
            </h3>
            <div className="bg-default-100 rounded-md w-56 h-56 relative shadow-lg overflow-hidden">
                <div className="rounded-md">
                    <Image
                        src={`/images/product_images/${props.imgPath}`}
                        width="160"
                        height="160"
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
            </div>
        </div>
    );
}
