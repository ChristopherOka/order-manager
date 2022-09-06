import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MainNavbar from "../components/MainNavbar";
import MainHeader from "../components/MainHeader";
import MainFooter from "../components/MainFooter";

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
                <section className="w-full h-96 relative bg-[url('/images/product_images/home_banner.jpg')] bg-cover"></section>
                <section className="w-full bg-default-100 flex justify-center items-center gap-10 mt-10">
                    <div className="w-96 h-96">
                        <Image
                            src="/images/product_images/santa_assortment.jpg"
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
                <section className="flex flex-col justify-around items-center bg-gray-100 mt-10 py-10 gap-4">
                    <h2 className="text-default-900 text-5xl font-fjalla-one">CUSTOM COOKIES</h2>
                    <p className="text-slate-600 text-xl">Homemade Cookies With Any Design That You'd Like!</p>
                    <button className="flex bg-default-900 rounded-md font-bold text-xl text-default-100 px-5 py-4 w-fit">
                            ORDER NOW
                        </button>
                </section>
                <MainFooter></MainFooter>
            </main>
        </div>
    );
}
