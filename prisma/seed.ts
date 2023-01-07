import { PrismaClient, Status } from '@prisma/client'
import { PrismaConsts } from './prisma.consts'

const prisma = new PrismaClient()

async function main() {

    const pending = await prisma.status.upsert({
        where: <Status>{ Id: PrismaConsts.STATUS_PENDING_ID },
        update: {},
        create: {
            Id:  PrismaConsts.STATUS_PENDING_ID,
            Name: 'Pending'
        },
    })

    const inProgress = await prisma.status.upsert({
        where: <Status>{ Id: PrismaConsts.STATUS_INPROGRESS_ID },
        update: {},
        create: {
            Id:  PrismaConsts.STATUS_INPROGRESS_ID,
            Name: 'In Progress'
        },
    })

    const completed = await prisma.status.upsert({
        where: <Status>{ Id: PrismaConsts.STATUS_COMPLETED_ID },
        update: {},
        create: {
            Id:  PrismaConsts.STATUS_COMPLETED_ID,
            Name: 'Completed'
        },
    })

    console.log({ pending, inProgress, completed })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })