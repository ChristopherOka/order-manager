import Image from 'next/image';

export default function OrderTableData (props) {
    return (
        <div className="flex justify-between items-center px-4 py-2 whitespace-nowrap gap-3 min-w-max">
            <div>
                {props.children}
            </div>
            <div className="flex">
                <Image src="/images/icons/square_edit.png" height="24" width="24"/>
            </div>
        </div>
    )

}