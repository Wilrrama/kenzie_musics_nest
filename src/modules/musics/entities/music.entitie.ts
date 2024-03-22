import { randomUUID } from 'crypto';

export class Music {
  readonly id: string;
  name: string;
  album: string;
  artist: string;
  genre: string;
  year: string;
  cover_image: string;
  music_url: string;
  user_id?: string;

  constructor() {
    this.id = randomUUID();
  }
}
