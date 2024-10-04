-- CreateTable
CREATE TABLE "MythicObjective" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "key" INTEGER NOT NULL,
    "period" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "guildId" TEXT NOT NULL,

    CONSTRAINT "MythicObjective_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MythicObjective" ADD CONSTRAINT "MythicObjective_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
