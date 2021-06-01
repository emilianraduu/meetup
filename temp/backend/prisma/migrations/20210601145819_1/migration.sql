-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pub" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "address" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "waiterId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("waiterId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Pub" ("id", "address", "images", "name", "ownerId", "waiterId", "createdAt", "updatedAt") SELECT "id", "address", "images", "name", "ownerId", "waiterId", "createdAt", "updatedAt" FROM "Pub";
DROP TABLE "Pub";
ALTER TABLE "new_Pub" RENAME TO "Pub";
CREATE UNIQUE INDEX "Pub.address_unique" ON "Pub"("address");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
