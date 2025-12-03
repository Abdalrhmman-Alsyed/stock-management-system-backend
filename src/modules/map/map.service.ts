import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Map } from './entities/map.entity';
import { CreateMapDto } from './dto/create-map.dto';
import { UpdateMapDto } from './dto/update-map.dto';

@Injectable()
export class MapsService {
  constructor(
    @InjectRepository(Map)
    private readonly repo: Repository<Map>,
  ) {}

  async create(dto: CreateMapDto): Promise<Map> {
    const map = this.repo.create(dto);
    return this.repo.save(map);
  }

  async findAll(): Promise<Map[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Map> {
    const map = await this.repo.findOne({ where: { id } });
    if (!map) throw new NotFoundException('Map not found');
    return map;
  }

  async update(id: number, dto: UpdateMapDto): Promise<Map> {
    const map = await this.findOne(id);
    Object.assign(map, dto);
    return this.repo.save(map);
  }

  async remove(id: number): Promise<void> {
    const map = await this.findOne(id);
    await this.repo.remove(map);
  }
}
