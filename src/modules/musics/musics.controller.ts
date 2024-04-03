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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('musics')
@Controller('musics')
export class MusicsController {
  constructor(private musicsService: MusicsService) {}
  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMusicDTO: CreateMusicDTO, @Request() req) {
    console.log(req.user);
    const userId = req.user.id;
    const userEmail = req.user.email;
    const music = await this.musicsService.create(createMusicDTO, userId);
    return { music, userId, userEmail };
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
