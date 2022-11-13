import MainHeader from "../components/MainHeader";
import ImageCarosel from "../components/ImageCarosel";
import MainFooter from "../components/MainFooter";
import Image from "next/image";

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
            <section className="flex flex-col justify-around items-center bg-gray-100 py-10 gap-4">
                <h1 className="text-default-900 text-5xl font-fjalla-one text-center px-4">
                    CUSTOM COOKIES
                </h1>
                <p className="text-slate-600 text-xl text-center px-4">
                    Contact Me Directly for Custom Orders!
                </p>
                <a
                    href="mailto:marthamrave@gmail.com"
                    className="flex bg-default-900 gap-3 justify-center items-center rounded-md font-bold text-xl text-default-100 px-5 py-4 w-fit"
                >
                    <div className="invert flex">
                        <Image
                            src="/images/icons/email.svg"
                            height="30"
                            width="30"
                        ></Image>
                    </div>
                    ORDER NOW
                </a>
            </section>
            <div className="overflow-auto">
                <ImageCarosel images={images} carosel_id="custom_cookies" />
            </div>

            <MainFooter></MainFooter>
        </>
    );
}
