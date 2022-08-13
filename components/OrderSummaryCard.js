import Image from "next/image";
import Popover from "./popover";

export default function OrderSummaryCard(props) {
    return (
        <div className="bg-default-100 px-4 py-3 rounded-md shadow-box w-96 h-80">
            <div className="flex justify-between">
                <h2 className="text-default-900 font-bold text-2xl pb-2">
                    {props.order.customer_name}
                </h2>
                <div className="flex gap-2">
                    <div>
                        <Popover content={`${props.order.is_verified ? 'Order is Verified!' : 'Needs Verification'}`}>
                            <Image
                                src={`/images/icons/${props.order.is_verified ? 'green_checkmark.png' : 'red_exclamation.png'}`}
                                width="28"
                                height="28"
                            />
                        </Popover>
                    </div>
                    <div>
                        <Popover content={`${props.order.has_paid ? 'Order Paid!' : 'Has Not Paid'} (${props.order.payment_type})`}>
                            <Image
                                src={`/images/icons/${props.order.has_paid ? 'green_money.png' : 'yellow_unpaid.png'}`}
                                width="28"
                                height="28"
                            />
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="overflow-y-auto max-h-60 pt-2">
                {Object.keys(props.order.order_items).map((item) => {
                    if (props.order.order_items[item] > 0) {
                        return (
                            <div key={item} className="border-b-2 text-lg pt-2">
                                {props.order.order_items[item]}x&nbsp;
                                {
                                    props.productNames.find(
                                        (product) => product.product_id == item
                                    ).product_name
                                }
                            </div>
                        );
                    } else {
                        return <div key={item}></div>;
                    }
                })}
            </div>
        </div>
    );
}
