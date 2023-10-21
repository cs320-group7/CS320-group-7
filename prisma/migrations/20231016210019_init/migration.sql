/*
  Warnings:

  - You are about to drop the column `cookBookId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the `CookBook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CookBook" DROP CONSTRAINT "CookBook_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_cookBookId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookBookId",
ADD COLUMN     "userId" INTEGER,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Recipe_id_seq";

-- DropTable
DROP TABLE "CookBook";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
