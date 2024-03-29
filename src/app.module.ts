import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicsModule } from './modules/musics/musics.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [MusicsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
