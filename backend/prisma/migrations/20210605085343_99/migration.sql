-- CreateTable
CREATE TABLE "_Schedule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Schedule_AB_unique" ON "_Schedule"("A", "B");

-- CreateIndex
CREATE INDEX "_Schedule_B_index" ON "_Schedule"("B");

-- AddForeignKey
ALTER TABLE "_Schedule" ADD FOREIGN KEY ("A") REFERENCES "Pub"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Schedule" ADD FOREIGN KEY ("B") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
