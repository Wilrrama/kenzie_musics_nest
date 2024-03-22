/*
  Warnings:

  - Added the required column `artist` to the `Music` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Music" ADD COLUMN     "artist" TEXT NOT NULL;
