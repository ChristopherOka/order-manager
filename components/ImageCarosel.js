import Image from "next/image";
import { useEffect, useRef } from "react";

export default function ImageCarosel(props) {
    const selected = useRef(props.images[0]);
    const THREE_HALVES_IMAGE_WIDTH = 900;
    const mounted = useRef(false);

    function swapImages(direction) {
        const caroselStart = Math.abs(
            THREE_HALVES_IMAGE_WIDTH -
                document.getElementById("carosel").offsetWidth / 2
        );
        const imageIdx = props.images.indexOf(selected.current);
        let newIdx = imageIdx + direction;
        if (imageIdx + direction < 0) {
            newIdx = props.images.length - 1;
        } else if (imageIdx + direction >= props.images.length) {
            newIdx = 0;
        }
        const caroselImages = document.querySelector(".carosel-images");
        caroselImages.style.transform = `translateX(-${
            caroselStart + newIdx * 604
        }px)`;
        selected.current = props.images[newIdx];
        document.querySelectorAll(".carosel-image.selected").forEach((el) => {
            el.classList.remove("selected");
            el.style = "opacity: 0.5";
        });
        const selectedImage = document.querySelector(
            `#carosel-image-${newIdx}`
        );
        selectedImage.style = "opacity: 1";
        selectedImage.classList.add("selected");
    }

    useEffect(() => {
        if (mounted.current) return;
        const caroselStart = Math.abs(
            THREE_HALVES_IMAGE_WIDTH -
                document.getElementById("carosel").offsetWidth / 2
        );
        document.querySelector(
            ".carosel-images"
        ).style.transform = `translateX(-${caroselStart}px)`;

        let loop;
        (function loopThroughImages() {
            loop = setTimeout(() => {
                swapImages(1);
                if (
                    props.images.indexOf(selected.current) < props.images.length
                ) {
                    loopThroughImages();
                }
            }, 4000);
        })();
        return () => clearTimeout(loop);

        mounted.current = true;
    }, []);

    return (
        <section className="flex justify-center items-center py-16">
            <div
                className="flex w-[66vw] overflow-hidden relative group"
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
                    {props.images.map((image, index) => {
                        return (
                            <div
                                className={`w-[600px] h-[600px] carosel-image transition ease duration-700 ${
                                    index === 0 ? "selected" : "opacity-50"
                                }`}
                                key={image}
                                id={`carosel-image-${index}`}
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
                <div className="absolute flex opacity-0 justify-center items-center left-0 h-full transition-opacity group-hover:opacity-100">
                    <button
                        className="px-3 py-5 opacity-70 bg-black flex"
                        onClick={() => {
                            swapImages(-1);
                        }}
                    >
                        <Image
                            src="/images/icons/carosel_arrow.svg"
                            height="30"
                            width="30"
                        />
                    </button>
                </div>
                <div className="absolute flex opacity-0 justify-center items-center right-0 h-full transition-opacity group-hover:opacity-100">
                    <button
                        className="px-3 py-5 opacity-70 bg-black flex rotate-180"
                        onClick={() => {
                            swapImages(1);
                        }}
                    >
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
