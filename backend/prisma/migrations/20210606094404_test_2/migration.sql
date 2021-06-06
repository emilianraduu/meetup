-- AlterTable
ALTER TABLE "Pub" ADD COLUMN     "description" TEXT;

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuSection" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" SERIAL NOT NULL,

    PRIMARY KEY ("id")
);
