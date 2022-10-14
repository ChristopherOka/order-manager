import MainHeader from "../components/MainHeader";
import ImageCarosel from "../components/ImageCarosel";
import MainFooter from "../components/MainFooter";

export default function CustomCookies() {
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

    return (
        <>
            <MainHeader active="custom"></MainHeader>
            <div className="overflow-auto">
                <h1 className="font-bold text-5xl text-center pb-5 pt-10 md:pb-5">
                    CUSTOM COOKIES
                </h1>
                <ImageCarosel images={images} carosel_id="custom_cookies" />
            </div>
            <MainFooter></MainFooter>
        </>
    );
}
