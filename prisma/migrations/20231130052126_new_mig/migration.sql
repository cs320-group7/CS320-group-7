-- AlterTable
CREATE SEQUENCE ingredient_id_seq;
ALTER TABLE "Ingredient" ALTER COLUMN "id" SET DEFAULT nextval('ingredient_id_seq'),
ADD CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE ingredient_id_seq OWNED BY "Ingredient"."id";

-- CreateTable
CREATE TABLE "_IngredientToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_IngredientToUser_AB_unique" ON "_IngredientToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_IngredientToUser_B_index" ON "_IngredientToUser"("B");

-- AddForeignKey
ALTER TABLE "_IngredientToUser" ADD CONSTRAINT "_IngredientToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_IngredientToUser" ADD CONSTRAINT "_IngredientToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
