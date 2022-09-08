import Head from "next/head";
import Image from "next/image";
import MainNavbar from "../components/MainNavbar";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";
import ImageCarosel from "../components/ImageCarosel";

export default function Home() {
    const images = [
        "/images/product_images/custom_products/1.jpg",
        "/images/product_images/custom_products/2.jpg",
        "/images/product_images/custom_products/3.jpg",
        "/images/product_images/custom_products/4.jpg",
        "/images/product_images/custom_products/5.jpg",
        "/images/product_images/custom_products/6.jpg",
        "/images/product_images/custom_products/7.jpg",
        "/images/product_images/custom_products/8.jpg",
        "/images/product_images/custom_products/9.jpg",
        "/images/product_images/custom_products/10.jpg",
    ];

    return (
        <div>
            <Head>
                <title>Martha Rave Cookies</title>
                <meta name="description" content="Martha Rave cookies" />
                <link rel="icon" href="/images/icons/favicon.ico" />
            </Head>

            <main>
                <MainHeader></MainHeader>
                <MainNavbar active="home"></MainNavbar>{" "}
                <section className="w-full h-96 relative bg-[url('/images/product_images/home_banner.jpg')] bg-cover"></section>
                <section className="w-full flex justify-center items-center gap-10 mt-16 bg-gray-100 py-10">
                    <div className="w-96 h-96 rounded-md overflow-hidden">
                        <Image
                            src="/images/product_images/christmas_products/santa_assortment.jpg"
                            objectFit="cover"
                            height="384"
                            width="384"
                        />
                    </div>
                    <div className="flex flex-col flex-end gap-6">
                        <h2 className="text-default-900 text-5xl font-fjalla-one">
                            CHRISTMAS COOKIES
                        </h2>
                        <p className="text-slate-600 text-2xl">
                            Order now for the 2022 season!
                        </p>
                        <button className="flex bg-default-900 rounded-md font-bold text-xl text-default-100 px-5 py-4 w-fit">
                            ORDER NOW
                        </button>
                    </div>
                </section>
                <ImageCarosel images={images}></ImageCarosel>
                <section className="flex flex-col justify-around items-center bg-gray-100 mb-16 py-10 gap-4">
                    <h2 className="text-default-900 text-5xl font-fjalla-one">
                        CUSTOM COOKIES
                    </h2>
                    <p className="text-slate-600 text-xl">
                        Homemade Cookies With Any Design That You&apos;d Like!
                    </p>
                    <button className="flex bg-default-900 rounded-md font-bold text-xl text-default-100 px-5 py-4 w-fit">
                        ORDER NOW
                    </button>
                </section>
                <MainFooter></MainFooter>
            </main>
        </div>
    );
}
