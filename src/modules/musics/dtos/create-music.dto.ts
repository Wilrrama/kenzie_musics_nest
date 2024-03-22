import { IsOptional, IsString } from 'class-validator';

export class CreateMusicDTO {
  @IsString()
  name: string;

  @IsString()
  album: string;

  @IsString()
  artist: string;

  @IsString()
  genre: string;

  @IsString()
  year: string;

  @IsString()
  @IsOptional()
  cover_image: string | null;

  @IsString()
  @IsOptional()
  music_url: string | null;

  @IsString()
  @IsOptional()
  userId?: string;
}
