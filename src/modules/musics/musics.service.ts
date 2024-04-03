import { Injectable } from '@nestjs/common';
import { Music } from './entities/music.entitie';
import { CreateMusicDTO } from './dtos/create-music.dto';
import { PrismaService } from '../../database/prisma.service';

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
    return music;
  }
}
