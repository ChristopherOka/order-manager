import Navbar from "../components/Navbar";
import FinancesTable from "../components/FinancesTable";
import Image from "next/image";
import Button from "../components/Button";
import * as db from "./api/database";

export async function getServerSideProps() {
    const materials = await db.getAllMaterials();
    console.log(materials);
    return {
        props: {
            materials,
        },
    };
}

export default function Finances({materials}) {

    const openPrintLayout = () => {
        window.print();
        return true;
    };

    return (
        <div
            className="w-screen relative h-screen"
        >
            <div className="absolute top-0 left-0 w-screen flex items-center justify-start my-5 pl-2 md:justify-end md:pr-5 print:hidden">
                <div className="w-[70px] md:w-[100px]">
                    <Image
                        src="/images/misc/logo.png"
                        width="100"
                        height="100"
                    />
                </div>
            </div>
            <h1 className="hidden text-default-900 font-bold text-4xl absolute top-0 left-0 my-5 w-screen items-center justify-center print:hidden xl:flex">
                FINANCES
            </h1>
            <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-between pt-8 pb-24 md:flex-row">
                <div className="ml-24 mr-4 flex flex-col justify-center overflow-auto sm:ml-28 md:ml-44 print:mx-0 print:pt-0">
                    <div className="flex justify-between items-center pb-6">
                        <div className="print:hidden">
                            <Button
                                img="/images/icons/printer.png"
                                type="secondary-md"
                                clickHandler={openPrintLayout}
                            ></Button>
                        </div>
                    </div>
                    <FinancesTable materials={materials}/>
                </div>
            </div>
            <Navbar activeTab="finances" />
        </div>
    );
}
