import Image from "next/image";

export default function MainHeader() {
    return (
        <section className="h-[20vh] bg-default-900 flex justify-center items-center">
            <div>
                <Image src="/images/misc/logo.png" width="160" height="160" />
            </div>
        </section>
    );
}
