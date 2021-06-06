/*
  Warnings:

  - A unique constraint covering the columns `[pubId]` on the table `Menu` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pubId` to the `Menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionId` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `MenuSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `MenuSection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `menuId` to the `MenuSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Menu" ADD COLUMN     "pubId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "sectionId" INTEGER NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MenuSection" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "menuId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Pub" ADD COLUMN     "currency" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Menu_pubId_unique" ON "Menu"("pubId");

-- AddForeignKey
ALTER TABLE "Menu" ADD FOREIGN KEY ("pubId") REFERENCES "Pub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD FOREIGN KEY ("sectionId") REFERENCES "MenuSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuSection" ADD FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;
