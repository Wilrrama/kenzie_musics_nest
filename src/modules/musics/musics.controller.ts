import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMusicDTO } from './dtos/create-music.dto';
import { MusicsService } from './musics.service';

@Controller('musics')
export class MusicsController {
  constructor(private musicsService: MusicsService) {}
  @Post('')
  create(@Body() createMusicDTO: CreateMusicDTO) {
    return this.musicsService.create(createMusicDTO);
  }

  @Get()
  findAll() {
    return this.musicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.musicsService.findOne(id);
  }
}
