import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MainNavbar from "../components/MainNavbar";
import MainHeader from "../components/MainHeader";

export default function Home() {
    return (
        <div>
            <Head>
                <title>Martha Rave Cookies</title>
                <meta name="description" content="Martha Rave cookies" />
                <link rel="icon" href="/images/icons/favicon.ico" />
            </Head>

            <main>
                <MainHeader></MainHeader>
                <MainNavbar active="home"></MainNavbar>
                <section className="w-full h-96 relative">
                    <Image
                        src="/images/product_images/home_banner.jpg"
                        layout="fill"
                    />
                </section>
                <section className="w-full bg-default-100 flex justify-center items-center">
                    <div></div>
                    <div className="flex flex-col flex-end gap-6">
                        <h2 className="font-bold text-default-900 text-4xl">
                            CHRISTMAS COOKIES
                        </h2>
                        <p>Order now for the 2022 season!</p>
                        <button className="flex bg-default-900 rounded-md font-bold text-xl text-default-100 px-5 py-4">
                            ORDER NOW
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
