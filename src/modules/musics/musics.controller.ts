import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateMusicDTO } from './dtos/create-music.dto';
import { MusicsService } from './musics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('musics')
export class MusicsController {
  constructor(private musicsService: MusicsService) {}
  @Post('')
  @UseGuards(JwtAuthGuard)
  create(@Body() createMusicDTO: CreateMusicDTO, @Request() req) {
    console.log(req.user);
    return this.musicsService.create(createMusicDTO, req.user.id);
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
