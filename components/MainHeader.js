import Image from "next/image";

export default function MainHeader() {
    return (
        <section className="h-[20vh] bg-default-900 flex justify-center items-center">
            <div className="pt-2">
                <Image src="/images/misc/logo.png" width="140" height="140" />
            </div>
        </section>
    );
}
