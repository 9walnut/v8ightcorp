// src/database/database.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        await AppDataSource.initialize(); // Initialize the AppDataSource
        return {
          ...AppDataSource.options,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
