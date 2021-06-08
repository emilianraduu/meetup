/*
  Warnings:

  - You are about to drop the column `xPos` on the `Table` table. All the data in the column will be lost.
  - You are about to drop the column `yPos` on the `Table` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MenuItem" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MenuSection" ALTER COLUMN "image" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Table" DROP COLUMN "xPos",
DROP COLUMN "yPos",
ADD COLUMN     "position" INTEGER NOT NULL DEFAULT 0;
