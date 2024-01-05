import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { SeriesModule } from './modules/series/series.module';

@Module({
  imports: [UserModule, SeriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
