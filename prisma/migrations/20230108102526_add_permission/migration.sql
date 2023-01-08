-- AlterTable
ALTER TABLE "User" ADD COLUMN     "PermissionId" INTEGER;

-- CreateTable
CREATE TABLE "Permission" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("Id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_PermissionId_fkey" FOREIGN KEY ("PermissionId") REFERENCES "Permission"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
