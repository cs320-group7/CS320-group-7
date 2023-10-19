/*
  Warnings:

  - You are about to drop the column `dietId` on the `UserDiet` table. All the data in the column will be lost.
  - You are about to drop the column `intoleranceId` on the `UserIntolerance` table. All the data in the column will be lost.
  - You are about to drop the `Diet` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Intolerance` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserDiet` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `UserIntolerance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserDiet" DROP CONSTRAINT "UserDiet_dietId_fkey";

-- DropForeignKey
ALTER TABLE "UserIntolerance" DROP CONSTRAINT "UserIntolerance_intoleranceId_fkey";

-- AlterTable
ALTER TABLE "UserDiet" DROP COLUMN "dietId",
ADD COLUMN     "diets" TEXT[];

-- AlterTable
ALTER TABLE "UserIntolerance" DROP COLUMN "intoleranceId",
ADD COLUMN     "intolerances" TEXT[];

-- DropTable
DROP TABLE "Diet";

-- DropTable
DROP TABLE "Intolerance";

-- CreateIndex
CREATE UNIQUE INDEX "UserDiet_userId_key" ON "UserDiet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserIntolerance_userId_key" ON "UserIntolerance"("userId");
