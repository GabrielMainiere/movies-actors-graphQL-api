import { Module } from '@nestjs/common';
import { provide } from './provide';

@Module({
  providers: [...provide],
  exports: [...provide],
})
export class DatabaseModule {}
