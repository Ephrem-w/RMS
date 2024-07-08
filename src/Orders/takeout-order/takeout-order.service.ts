import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTakeoutOrderDto } from './dto/create-takeout-order.dto';
import { UpdateTakeoutOrderDto } from './dto/update-takeout-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TakeoutOrder } from './entities/takeout-order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TakeoutOrderService {
  constructor(
    @InjectRepository(TakeoutOrder)
    private readonly takeOutRepo: Repository<TakeoutOrder>,
  ) {}
  async create(
    createTakeoutOrderDto: CreateTakeoutOrderDto,
  ): Promise<TakeoutOrder> {
    try {
      const newOrder = this.takeOutRepo.create(createTakeoutOrderDto);
      return await this.takeOutRepo.save(newOrder);
    } catch (error) {
      throw new Error(`Error creating takeuto order: ${error.message}`);
    }
  }
  async findAll(): Promise<TakeoutOrder[]> {
    try {
      return await this.takeOutRepo.find();
    } catch (error) {
      throw new Error(`Error fetching all takeout orders: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<TakeoutOrder> {
    try {
      const order = await this.takeOutRepo.findOne({ where: { id: id } });
      if (!order) {
        throw new NotFoundException(`takeout order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new Error(
        `Error fetching takeout order with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateTakeoutOrderDto: UpdateTakeoutOrderDto,
  ): Promise<TakeoutOrder> {
    try {
      const order = await this.findOne(id);
      await this.takeOutRepo.update(id, updateTakeoutOrderDto);
      return { ...order, ...updateTakeoutOrderDto };
    } catch (error) {
      throw new Error(
        `Error updating takeout order with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.takeOutRepo.delete(id);
    } catch (error) {
      throw new Error(
        `Error deleting takeout order with ID ${id}: ${error.message}`,
      );
    }
  }
}
