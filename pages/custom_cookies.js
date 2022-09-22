import MainHeader from "../components/MainHeader";
import { useState, useEffect } from "react";
import debounce from "../utils/globals.js";
import ImageCarosel from "../components/ImageCarosel";

export default function CustomCookies() {
    const [innerHeight, updateInnerHeight] = useState(0);

    const images = [
        "/images/product_images/custom_products/1.webp",
        "/images/product_images/custom_products/2.webp",
        "/images/product_images/custom_products/3.webp",
        "/images/product_images/custom_products/4.webp",
        "/images/product_images/custom_products/5.webp",
        "/images/product_images/custom_products/6.webp",
        "/images/product_images/custom_products/7.webp",
        "/images/product_images/custom_products/8.webp",
        "/images/product_images/custom_products/9.webp",
        "/images/product_images/custom_products/10.webp",
    ];

    useEffect(() => {
        function detectInnerHeight() {
            const headerHeight =
                document.querySelector("#main-header").offsetHeight;
            const navbarHeight =
                document.querySelector("#main-navbar").offsetHeight;
            updateInnerHeight(window.innerHeight - headerHeight - navbarHeight);
        }
        detectInnerHeight();
        window.addEventListener("resize", debounce(detectInnerHeight, 500));
    }, []);

    return (
        <>
            <MainHeader active="custom"></MainHeader>
            <div
                className="overflow-auto"
                style={{ height: `${innerHeight + "px" || "100vh"}` }}
            >
                <h1 className="font-bold text-5xl text-center pb-5 pt-10 md:pb-5">
                    CUSTOM COOKIES
                </h1>
                <ImageCarosel images={images} carosel_id="custom_cookies" />
            </div>
        </>
    );
}
