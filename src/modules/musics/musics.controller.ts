import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateMusicDTO } from './dtos/create-music.dto';
import { MusicsService } from './musics.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@ApiTags('musics')
@Controller('musics')
export class MusicsController {
  constructor(private musicsService: MusicsService) {}
  @Post('')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createMusicDTO: CreateMusicDTO, @Request() req) {
    // console.log(req.user);
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

  @Patch('upload/:id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'cover_image', maxCount: 1 },
      { name: 'music', maxCount: 1 },
    ]),
  )
  upload(
    @UploadedFiles()
    files: {
      cover_image?: Express.Multer.File[];
      music?: Express.Multer.File;
    },
    @Param('id') id: string,
  ) {
    const { cover_image, music } = files;
    return this.musicsService.upload(cover_image[0], music[0], id);
  }
}
