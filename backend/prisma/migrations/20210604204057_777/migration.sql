/*
  Warnings:

  - You are about to drop the column `maxDistance` on the `Pub` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pub" DROP COLUMN "maxDistance";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "maxDistance" DOUBLE PRECISION NOT NULL DEFAULT 5;
