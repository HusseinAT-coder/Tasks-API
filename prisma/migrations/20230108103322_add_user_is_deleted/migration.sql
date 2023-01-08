/*
  Warnings:

  - You are about to drop the column `DeleterId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "DeleterId",
ADD COLUMN     "IsDeleted" BOOLEAN NOT NULL DEFAULT false;
