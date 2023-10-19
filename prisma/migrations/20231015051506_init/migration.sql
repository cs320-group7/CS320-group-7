/*
  Warnings:

  - You are about to drop the column `diets` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Diet` table. All the data in the column will be lost.
  - You are about to drop the column `intolerances` on the `Intolerance` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Intolerance` table. All the data in the column will be lost.
  - You are about to drop the column `cookbookId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `Cookbook` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `diet` to the `Diet` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intolerance` to the `Intolerance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cookbook" DROP CONSTRAINT "Cookbook_userId_fkey";

-- DropForeignKey
ALTER TABLE "Diet" DROP CONSTRAINT "Diet_userId_fkey";

-- DropForeignKey
ALTER TABLE "Intolerance" DROP CONSTRAINT "Intolerance_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_cookbookId_fkey";

-- DropIndex
DROP INDEX "Diet_userId_key";

-- DropIndex
DROP INDEX "Intolerance_userId_key";

-- AlterTable
ALTER TABLE "Diet" DROP COLUMN "diets",
DROP COLUMN "userId",
ADD COLUMN     "diet" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Intolerance" DROP COLUMN "intolerances",
DROP COLUMN "userId",
ADD COLUMN     "intolerance" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookbookId",
ADD COLUMN     "cookBookId" INTEGER;

-- DropTable
DROP TABLE "Cookbook";

-- CreateTable
CREATE TABLE "UserIntolerance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "intoleranceId" INTEGER NOT NULL,

    CONSTRAINT "UserIntolerance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDiet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dietId" INTEGER NOT NULL,

    CONSTRAINT "UserDiet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CookBook" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CookBook_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CookBook_userId_key" ON "CookBook"("userId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_cookBookId_fkey" FOREIGN KEY ("cookBookId") REFERENCES "CookBook"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIntolerance" ADD CONSTRAINT "UserIntolerance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserIntolerance" ADD CONSTRAINT "UserIntolerance_intoleranceId_fkey" FOREIGN KEY ("intoleranceId") REFERENCES "Intolerance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiet" ADD CONSTRAINT "UserDiet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiet" ADD CONSTRAINT "UserDiet_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CookBook" ADD CONSTRAINT "CookBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
