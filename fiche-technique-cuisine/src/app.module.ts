import { ConfigModule } from '@nestjs/config';

import { HomeController } from './home.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'; 

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './process.env',
    }),
    TypeOrmModule.forRoot({
      url: process.env.DATABASE_URL, 
      type: 'postgres',
      ssl: {
        rejectUnauthorized: false,
      }, 
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true, // This for development
      autoLoadEntities: true,
    }),
  ],
  controllers: [
    HomeController, AppController],
  providers: [AppService],
})
export class AppModule { }
