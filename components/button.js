import Image from 'next/image';

export default function Button(props) {
    let buttonStyle;
    switch(props.type) {
        case 'primary': 
            buttonStyle = 'bg-default-900 text-default-100 text-xl px-7 h-14 gap-4';
            break;
        case 'secondary':
            buttonStyle = 'bg-default-100 text-default-900 shadow-3xl text-xl px-7 h-14 gap-4';
            break;
        case 'primary-md':
            buttonStyle = 'bg-default-900 text-default-100 text-md px-6 h-10 gap-3 my-2 mx-5 float-right';
            break;
        case 'tertiary':
            break;
        default:
            buttonStyle = '';
    }
    return (
        <>
            <button 
            className={'tracking-widest rounded-md flex items-center font-bold' + ' ' + buttonStyle}
            onClick={props.clickHandler}
            >
                <Image 
                    className={props.type == 'secondary' ? 'invert': null} 
                    src={props.img} 
                    width={`${props.type == 'primary-md' ? '24' : '28'}`} 
                    height={`${props.type == 'primary-md' ? '24' : '28'}`}
                />
                {props.children}
            </button>
        </>
    )
}