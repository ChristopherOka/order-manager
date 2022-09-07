import Image from "next/image";
import { useState, useEffect } from "react";

export default function ImageCarosel(props) {
    const [selected, setSelected] = useState(props.images[0]);
    const THREE_HALVES_IMAGE_WIDTH = 900;
    let mounted = false;
    let imageIdx = 1;
    let caroselStart;

    function selectImage(newImageIdx) {
        debugger
        setSelected(props.images[newImageIdx]);
        const caroselImages = document.querySelector(".carosel-images");
        caroselImages.style.transform = `translateX(-${
            caroselStart + newImageIdx * 604
        }px)`;
        imageIdx = newImageIdx;
    }

    useEffect(() => {
        if (mounted) return;
        caroselStart = Math.abs(
            THREE_HALVES_IMAGE_WIDTH -
                document.getElementById("carosel").offsetWidth / 2
        );
        document.querySelector(
            ".carosel-images"
        ).style.transform = `translateX(-${caroselStart}px)`;
        
        (function loopThroughImages() {
            setTimeout(() => {
                console.log(imageIdx);
                if (imageIdx >= props.images.length) {
                    imageIdx = 0;
                }
                selectImage(imageIdx);
                if (imageIdx < props.images.length) {
                    loopThroughImages();
                }
                imageIdx++;
            }, 4000);
        })();
        mounted = true;
    }, []);

    return (
        <section className="flex justify-center items-center py-16">
            <div
                className="flex w-[66vw] overflow-hidden relative"
                id="carosel"
            >
                <div className="flex gap-1 carosel-images transition ease duration-700">
                    <div
                        className={`w-[600px] h-[600px] carosel-image opacity-50`}
                    >
                        <Image
                            src={props.images[props.images.length - 1]}
                            height="600"
                            width="600"
                            objectFit="cover"
                        />
                    </div>
                    {props.images.map((image) => {
                        const isSelected = image === selected;

                        return (
                            <div
                                className={`w-[600px] h-[600px] carosel-image transition ease duration-700 ${
                                    isSelected ? "" : "opacity-50"
                                }`}
                                key={image}
                            >
                                <Image
                                    src={image}
                                    height="600"
                                    width="600"
                                    objectFit="cover"
                                />
                            </div>
                        );
                    })}
                    <div
                        className={`w-[600px] h-[600px] carosel-image opacity-50`}
                    >
                        <Image
                            src={props.images[0]}
                            height="600"
                            width="600"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="absolute flex justify-center items-center left-0 h-full">
                    <button className="px-3 py-5 opacity-70 bg-black flex">
                        <Image
                            src="/images/icons/carosel_arrow.svg"
                            height="30"
                            width="30"
                        />
                    </button>
                </div>
                <div className="absolute flex justify-center items-center right-0 h-full">
                    <button className="px-3 py-5 opacity-70 bg-black flex rotate-180" onClick={() => {selectImage(imageIdx + 1)}}>
                        <Image
                            src="/images/icons/carosel_arrow.svg"
                            height="30"
                            width="30"
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}
