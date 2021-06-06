/*
  Warnings:

  - You are about to drop the column `tableId` on the `Table` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_tableId_fkey";

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "tableId";

-- AddForeignKey
ALTER TABLE "Table" ADD FOREIGN KEY ("id") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
