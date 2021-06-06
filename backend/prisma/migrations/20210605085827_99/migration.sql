/*
  Warnings:

  - You are about to drop the `_Schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Schedule" DROP CONSTRAINT "_Schedule_A_fkey";

-- DropForeignKey
ALTER TABLE "_Schedule" DROP CONSTRAINT "_Schedule_B_fkey";

-- AlterTable
ALTER TABLE "Schedule" ADD COLUMN     "pubId" INTEGER;

-- DropTable
DROP TABLE "_Schedule";

-- AddForeignKey
ALTER TABLE "Schedule" ADD FOREIGN KEY ("pubId") REFERENCES "Pub"("id") ON DELETE SET NULL ON UPDATE CASCADE;
