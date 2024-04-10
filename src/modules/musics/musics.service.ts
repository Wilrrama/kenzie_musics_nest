import { Injectable, NotFoundException } from '@nestjs/common';
import { Music } from './entities/music.entitie';
import { CreateMusicDTO } from './dtos/create-music.dto';
import { PrismaService } from '../../database/prisma.service';
import { v2 as cloudinary } from 'cloudinary';
import { unlink } from 'node:fs';

@Injectable()
export class MusicsService {
  constructor(private prisma: PrismaService) {}

  async create(createMusicDTO: CreateMusicDTO, userId: string) {
    const music = new Music();
    Object.assign(music, {
      ...createMusicDTO,
    });

    await this.prisma.music.create({
      data: {
        id: music.id,
        album: music.album,
        artist: music.artist,
        genre: music.genre,
        name: music.name,
        year: music.year,
        cover_image: music.cover_image,
        music_url: music.music_url,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    return music;
  }

  async findAll() {
    const musics = await this.prisma.music.findMany();
    return musics;
  }

  async findOne(id: string) {
    const music = await this.prisma.music.findFirst({ where: { id } });
    if (!music) {
      throw new NotFoundException('Music not found');
    }
    return music;
  }

  async upload(
    cover_image: Express.Multer.File,
    music: Express.Multer.File,
    musicId: string,
  ) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
    const findMusic = await this.prisma.music.findFirst({
      where: { id: musicId },
    });
    if (!findMusic) {
      throw new NotFoundException('Music not found');
    }

    const uploadImage = await cloudinary.uploader.upload(
      cover_image.path,
      { resource_type: 'image' },
      (error, result) => {
        return result;
      },
    );

    const uploadMusic = await cloudinary.uploader.upload(
      music.path,
      { resource_type: 'video' },
      (error, result) => {
        return result;
      },
    );
    console.log(uploadImage, uploadMusic);

    const updateMusic = await this.prisma.music.update({
      where: { id: musicId },
      data: {
        cover_image: uploadImage.secure_url,
        music_url: uploadMusic.secure_url,
      },
    });

    unlink(cover_image.path, (error) => {
      if (error) console.log(error);
    });

    unlink(music.path, (error) => {
      if (error) console.log(error);
    });

    return updateMusic;
  }
}
