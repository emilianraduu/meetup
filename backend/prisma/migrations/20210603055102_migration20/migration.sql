-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "pubId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startHour" TEXT NOT NULL,
    "endHour" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Reservation" ADD FOREIGN KEY ("pubId") REFERENCES "Pub"("id") ON DELETE CASCADE ON UPDATE CASCADE;
