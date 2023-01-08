import { Permission, PrismaClient, Status } from '@prisma/client'
import { PrismaConsts } from './prisma.consts'

const prisma = new PrismaClient()

async function main() {

    const pending = await prisma.status.upsert({
        where: <Status>{ Id: PrismaConsts.STATUS_PENDING_ID },
        update: {
            Name: 'Pending'
        },
        create: {
            Id: PrismaConsts.STATUS_PENDING_ID,
            Name: 'Pending'
        },
    })

    const inProgress = await prisma.status.upsert({
        where: <Status>{ Id: PrismaConsts.STATUS_INPROGRESS_ID },
        update: {},
        create: {
            Id: PrismaConsts.STATUS_INPROGRESS_ID,
            Name: 'In Progress'
        },
    })

    const completed = await prisma.status.upsert({
        where: <Status>{ Id: PrismaConsts.STATUS_COMPLETED_ID },
        update: {},
        create: {
            Id: PrismaConsts.STATUS_COMPLETED_ID,
            Name: 'Completed'
        },
    })

    //permissions
    const superAdmin = await prisma.permission.upsert({
        where: <Permission>{ Id: PrismaConsts.PERMISSION_SUPER_ADMIN_ID },
        update: {
            Name: 'Super Admin'
        },
        create: {
            Id: PrismaConsts.PERMISSION_SUPER_ADMIN_ID,
            Name: 'Super Admin'
        },
    })

    const admin = await prisma.permission.upsert({
        where: <Permission>{ Id: PrismaConsts.PERMISSION_ADMIN_ID },
        update: {},
        create: {
            Id: PrismaConsts.PERMISSION_ADMIN_ID,
            Name: 'Admin'
        },
    })

    const normal = await prisma.permission.upsert({
        where: <Permission>{ Id: PrismaConsts.PERMISSION_NORMAL_ID },
        update: {},
        create: {
            Id: PrismaConsts.PERMISSION_NORMAL_ID,
            Name: 'Normal'
        },
    })

    console.log({ superAdmin, admin, normal })
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