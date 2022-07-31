import { useState } from 'react';
import Image from 'next/image';

export default function BlurImage (props) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <a href="#">
            <div className="rounded-b-lg overflow-hidden bg-gray-200 relative w-72 h-72 shadow-2xl rounded-b-lg group-hover:opacity-75 duration-300 ease-in-out">
                <Image
                    className={`${isLoading ? 'grayscale blur-2xl scale-110' : 'grayscale-0 blur-0 scale-100'}`}
                    alt={props.alt}
                    src={`/images/product_images/${props.imgPath}`} 
                    objectFit="cover" 
                    layout="fill"
                    onLoadingComplete={() => setIsLoading(false)}
                    priority={true}
                />
            </div>
        </a>
    )

}