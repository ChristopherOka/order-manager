import Image from 'next/image';

export default function AtAGlanceRow(props) {
    return (
        <div className="pb-2 flex justify-between">
            <div className="flex gap-3 pr-4">
                <span><Image src={props.src} width="35" height="35"/></span>
                <span>{props.text}</span>
            </div>
            <span>{props.number}</span>
        </div>
    )
}