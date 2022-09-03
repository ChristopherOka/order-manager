import Navbar from "../components/Navbar";
import FinancesTable from "../components/FinancesTable";
import Image from "next/image";
import Button from "../components/Button";
import { useState } from "react";
import * as db from "./api/database";

export async function getServerSideProps() {
    const materials = await db.getAllMaterials();

    return {
        props: {
            initialMaterials: materials,
        },
    };
}

export default function Finances({ initialMaterials }) {
    const [addMaterialOpen, setAddMaterialOpen] = useState(false);
    const [materialName, setMaterialName] = useState("");
    const [materials, setMaterials] = useState(initialMaterials);

    const openPrintLayout = () => {
        window.print();
        return true;
    };

    const toggleAddMaterialOpen = () => {
        setAddMaterialOpen(!addMaterialOpen);
        return true;
    };

    const addMaterial = async () => {
        await db.addMaterial(materialName);
        setMaterials(await db.getAllMaterials());
        toggleAddMaterialOpen();
    };

    const updateMaterialName = (e) => {
        setMaterialName(e.target.value);
        return true;
    };

    return (
        <div className="w-screen relative h-screen">
            <div className="absolute top-0 left-0 w-screen flex items-center justify-start my-5 pl-2 md:justify-end md:pr-5 print:hidden">
                <div className="rounded-md bg-default-900 p-3 flex w-[70px] md:w-[100px]">
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
            <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-between pb-72 md:flex-row">
                <div className="ml-8 mr-4 flex flex-col justify-center overflow-auto print:mx-0 print:pt-0">
                    <div className="flex justify-between items-center relative pb-6">
                        <div className="print:hidden">
                            <button
                                className="bg-default-900 rounded-md text-default-100 font-bold px-4 py-2 flex items-center gap-3"
                                onClick={toggleAddMaterialOpen}
                            >
                                <Image
                                    src="/images/icons/plus.png"
                                    width="16"
                                    height="16"
                                />
                                ADD MATERIAL
                            </button>
                        </div>
                        <div className="print:hidden">
                            <Button
                                img="/images/icons/printer.png"
                                type="secondary-md"
                                clickHandler={openPrintLayout}
                            ></Button>
                        </div>
                        <div
                            className={`${
                                addMaterialOpen ? "absolute" : "hidden"
                            } top-0 left-0 h-12 w-full shadow-md bg-default-100 rounded-md flex items-center justify-between`}
                        >
                            <div className="flex justify-start items-center pl-2 gap-2">
                                <p className="text-default-900  text-lg">
                                    Name:
                                </p>
                                <input
                                    className="rounded-md bg-zinc-200 px-2"
                                    onChange={updateMaterialName}
                                />
                            </div>
                            <div className="flex gap-2 pr-2">
                                <button
                                    className="rounded-md bg-default-900 w-6 h-6 flex justify-center items-center"
                                    onClick={addMaterial}
                                >
                                    <Image
                                        src="/images/icons/plus.png"
                                        width="14"
                                        height="14"
                                    />
                                </button>
                                <button
                                    className="rounded-md bg-default-900 w-6 h-6 flex justify-center items-center"
                                    onClick={toggleAddMaterialOpen}
                                >
                                    <Image
                                        src="/images/icons/red_x.png"
                                        width="13"
                                        height="13"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    <FinancesTable materials={materials} />
                </div>
            </div>
            <Navbar activeTab="finances" />
        </div>
    );
}
