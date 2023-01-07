-- CreateTable
CREATE TABLE "Status" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Task" (
    "Id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Description" TEXT,
    "StatusId" INTEGER NOT NULL,
    "AssigneeId" INTEGER,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_StatusId_fkey" FOREIGN KEY ("StatusId") REFERENCES "Status"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_AssigneeId_fkey" FOREIGN KEY ("AssigneeId") REFERENCES "User"("Id") ON DELETE SET NULL ON UPDATE CASCADE;
