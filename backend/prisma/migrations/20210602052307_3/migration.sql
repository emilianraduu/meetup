/*
  Warnings:

  - Added the required column `latitude` to the `Pub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Pub` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pub" ADD COLUMN     "latitude" INTEGER NOT NULL,
ADD COLUMN     "longitude" INTEGER NOT NULL,
ADD COLUMN     "freeTable" INTEGER,
ADD COLUMN     "avgRating" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "priceAvg" INTEGER NOT NULL DEFAULT 0;
