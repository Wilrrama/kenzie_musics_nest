-- DropForeignKey
ALTER TABLE "musics" DROP CONSTRAINT "musics_userId_fkey";

-- AlterTable
ALTER TABLE "musics" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "musics" ADD CONSTRAINT "musics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
