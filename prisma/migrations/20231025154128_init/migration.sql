-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserIntolerance" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "intolerances" TEXT[],

    CONSTRAINT "UserIntolerance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDiet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "diets" TEXT[],

    CONSTRAINT "UserDiet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RecipeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserIntolerance_userId_key" ON "UserIntolerance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserDiet_userId_key" ON "UserDiet"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_RecipeToUser_AB_unique" ON "_RecipeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RecipeToUser_B_index" ON "_RecipeToUser"("B");

-- AddForeignKey
ALTER TABLE "UserIntolerance" ADD CONSTRAINT "UserIntolerance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDiet" ADD CONSTRAINT "UserDiet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUser" ADD CONSTRAINT "_RecipeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RecipeToUser" ADD CONSTRAINT "_RecipeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
