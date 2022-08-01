import Image from 'next/image';

export default function Button(props) {
    let buttonStyle;
    switch(props.type) {
        case 'primary': 
            buttonStyle = '';
            break;
        case 'secondary':
            break;
        case 'tertiary':
            break;
        default:
            buttonStyle = '';
    }
    return (
        <>
            <button 
            className={'bg-default-900 text-default-100 text-xl tracking-wider rounded-md px-7 flex items-center h-14 gap-4' + ' ' + buttonStyle}
            onClick={props.clickHandler}
            >
                <Image src={props.img} width="28" height="28"/>
                {props.children}
            </button>
        </>
    )
}