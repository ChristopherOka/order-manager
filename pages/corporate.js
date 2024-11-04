import * as db from './api/database'

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
    return <div></div>
}
