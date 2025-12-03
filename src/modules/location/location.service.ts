import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './entities/location.entity';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: Repository<Location>,
  ) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    const loc = this.locationRepo.create(dto);
    return this.locationRepo.save(loc);
  }

  async findAll(): Promise<Location[]> {
    return this.locationRepo.find();
  }

  async findOne(id: number): Promise<Location> {
    const loc = await this.locationRepo.findOne({ where: { id } });

    if (!loc) {
      throw new NotFoundException('Location not found');
    }

    return loc;
  }

  async update(id: number, dto: UpdateLocationDto): Promise<Location> {
    const loc = await this.findOne(id);
    Object.assign(loc, dto);
    return this.locationRepo.save(loc);
  }

  async remove(id: number): Promise<void> {
    const loc = await this.findOne(id);
    await this.locationRepo.remove(loc);
  }
}
