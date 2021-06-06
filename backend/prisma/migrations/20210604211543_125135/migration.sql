/*
  Warnings:

  - You are about to alter the column `maxDistance` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "maxDistance" SET DEFAULT 5000,
ALTER COLUMN "maxDistance" SET DATA TYPE INTEGER;
