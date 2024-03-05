import { Injectable } from '@nestjs/common';
import { Music } from './entities/music.entitie';
import { CreateMusicDTO } from './dtos/create-music.dto';

@Injectable()
export class MusicsService {
  private database: Music[] = [];

  async create(createMusicDTO: CreateMusicDTO) {
    const music = new Music();
    Object.assign(music, {
      ...createMusicDTO,
    });
    this.database.push(music);
    return music;
  }

  async findAll() {
    return this.database;
  }

  async findOne(id: string) {
    const music = this.database.find((music) => music.id === id);
    return music;
  }
}
