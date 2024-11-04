import { getSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import Button from '../components/Button'
import FinancesChart from '../components/FinancesChart'
import FinancesTable from '../components/FinancesTable'
import Navbar from '../components/Navbar'
import * as db from './api/database'
import { allowedEmails } from './login'

export async function getServerSideProps(context) {
    // const session = await getSession(context)
    //
    // if (
    //     process.env.NODE_ENV !== 'development' &&
    //     (!session || !allowedEmails.includes(session.user.email))
    // ) {
    //     context.res.writeHead(302, { Location: '/login' })
    //     context.res.end()
    //     return {}
    // }
    const materials = await db.getAllMaterials()

    const start_date = new Date()
    start_date.setMonth(start_date.getMonth() - 1)
    const end_date = new Date()
    const spendingByDay = await db.getSpendingByDay(start_date, end_date)

    return {
        props: {
            initialMaterials: materials,
            initialSpendingByDay: spendingByDay,
        },
    }
}

export default function Corporate({ initialMaterials, initialSpendingByDay }) {
    const [addMaterialOpen, setAddMaterialOpen] = useState(false)
    const [materialName, setMaterialName] = useState('')
    const [materials, setMaterials] = useState(initialMaterials)
    const [spendingByDay, setSpendingByDay] = useState(initialSpendingByDay)
    const rendered = useRef(false)

    let initialStartDate = new Date()
    initialStartDate.setMonth(initialStartDate.getMonth() - 1)
    initialStartDate =
        initialStartDate.getUTCFullYear() +
        '-' +
        ('0' + (initialStartDate.getUTCMonth() + 1)).slice(-2) +
        '-' +
        ('0' + initialStartDate.getUTCDate()).slice(-2)
    let initialEndDate = new Date()
    initialEndDate =
        initialEndDate.getUTCFullYear() +
        '-' +
        ('0' + (initialEndDate.getUTCMonth() + 1)).slice(-2) +
        '-' +
        ('0' + initialEndDate.getUTCDate()).slice(-2)
    const [startDate, setStartDate] = useState(initialStartDate)
    const [endDate, setEndDate] = useState(initialEndDate)

    const openPrintLayout = () => {
        window.print()
        return true
    }

    const toggleAddMaterialOpen = () => {
        setAddMaterialOpen(!addMaterialOpen)
        return true
    }

    const addMaterial = async () => {
        await db.addMaterial(materialName)
        setMaterials(await db.getAllMaterials())
        toggleAddMaterialOpen()
    }

    const updateMaterialName = (e) => {
        setMaterialName(e.target.value)
        return true
    }

    const updateStartDate = (e) => {
        setStartDate(e.target.value)
        return true
    }

    const updateEndDate = (e) => {
        setEndDate(e.target.value)
        return true
    }

    useEffect(() => {
        if (!rendered.current) {
            rendered.current = true
            return
        }
        const updateSpendingByDay = async () => {
            const newSpendingByDay = await db.getSpendingByDay(
                startDate,
                endDate
            )
            setSpendingByDay(newSpendingByDay)
        }
        updateSpendingByDay()
    }, [startDate, endDate])

    return (
        <div className="w-screen relative h-screen">
            <div className="absolute top-0 left-0 w-screen flex items-center justify-start my-5 pl-2 md:pr-5 print:hidden">
                <div className="rounded-md bg-default-900 p-3 flex w-[70px] md:w-[100px]">
                    <Image
                        src="/images/misc/logo.png"
                        width="100"
                        height="100"
                    />
                </div>
            </div>
            <h1 className="flex text-default-900 font-bold text-4xl absolute top-0 left-0 my-5 w-screen items-center justify-center print:hidden">
                FINANCES
            </h1>
            <div className="absolute z-10 top-0 right-0 w-screen flex items-center justify-end my-5 pr-2 print:hidden">
                <Button
                    type="primary-md"
                    img="/images/icons/logout.svg"
                    clickHandler={() => {
                        signOut()
                        return true
                    }}
                >
                    <span className="hidden lg:inline">SIGN OUT</span>
                </Button>
            </div>
            <div className="absolute top-0 left-0 h-full overflow-auto mt-24 pb-32 w-full flex flex-col md:flex-row justify-center gap-5 lg:gap-20 items-center lg:mt-0 lg:pb-0">
                <div className="ml-8 mr-4 flex flex-col justify-center pb-10 overflow-auto print:mx-0 print:pt-0">
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
                                addMaterialOpen ? 'absolute' : 'hidden'
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
                <div className="w-fit h-fit mx-2 print:hidden">
                    <h2 className="font-bold text-xl text-center">
                        Cumulative Spending
                    </h2>
                    <FinancesChart spendingByDay={spendingByDay} />
                    <div className="flex justify-between items-center gap-2 pt-3">
                        <p>Date Range</p>
                        <input
                            className={`
                        rounded cursor-pointer bg-zinc-200 px-2 text-lg text-slate-700 h-8
                        ${'' ? 'border-red-400 border-2' : ''}`}
                            type="date"
                            max={initialEndDate}
                            defaultValue={startDate}
                            onChange={updateStartDate}
                        />
                        <div>—</div>
                        <input
                            className={`
                        rounded cursor-pointer bg-zinc-200 px-2 text-lg text-slate-700 h-8
                        ${'' ? 'border-red-400 border-2' : ''}`}
                            type="date"
                            max={initialEndDate}
                            defaultValue={endDate}
                            onChange={updateEndDate}
                        />
                    </div>
                </div>
            </div>
            <Navbar activeTab="corporate" />
        </div>
    )
}
