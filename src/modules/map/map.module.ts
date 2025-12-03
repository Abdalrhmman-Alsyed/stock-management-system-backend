import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Map } from './entities/map.entity';
import { MapsService } from './map.service';
import { MapsController } from './map.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Map])],
  controllers: [MapsController],
  providers: [MapsService],
  exports: [MapsService],
})
export class MapsModule {}
