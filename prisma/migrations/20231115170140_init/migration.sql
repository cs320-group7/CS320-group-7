/*
  Warnings:

  - You are about to drop the `UserDiet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserIntolerance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDiet" DROP CONSTRAINT "UserDiet_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserIntolerance" DROP CONSTRAINT "UserIntolerance_userId_fkey";

-- DropTable
DROP TABLE "UserDiet";

-- DropTable
DROP TABLE "UserIntolerance";

-- CreateTable
CREATE TABLE "Intolerance" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Intolerance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "name" TEXT NOT NULL,
    "id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_IntoleranceToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Intolerance_name_key" ON "Intolerance"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_id_key" ON "Ingredient"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_IntoleranceToUser_AB_unique" ON "_IntoleranceToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_IntoleranceToUser_B_index" ON "_IntoleranceToUser"("B");

-- AddForeignKey
ALTER TABLE "_IntoleranceToUser" ADD CONSTRAINT "_IntoleranceToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Intolerance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IntoleranceToUser" ADD CONSTRAINT "_IntoleranceToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
