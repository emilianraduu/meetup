-- AlterTable
ALTER TABLE "Pub" ADD COLUMN     "scheduleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Pub" ADD FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
