import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOnlineOrderDto } from './dto/create-online-order.dto';
import { UpdateOnlineOrderDto } from './dto/update-online-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OnlineOrder } from './entities/online-order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OnlineOrderService {
  constructor(
    @InjectRepository(OnlineOrder)
    private readonly onlineOrderRepo: Repository<OnlineOrder>,
  ) {}
  async create(
    createOnlineOrderDto: CreateOnlineOrderDto,
  ): Promise<OnlineOrder> {
    try {
      const newOrder = this.onlineOrderRepo.create(createOnlineOrderDto);
      return await this.onlineOrderRepo.save(newOrder);
    } catch (error) {
      throw new Error(`Error creating online erder: ${error.message}`);
    }
  }
  async findAll(): Promise<OnlineOrder[]> {
    try {
      return await this.onlineOrderRepo.find();
    } catch (error) {
      throw new Error(`Error fetching all online orders: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<OnlineOrder> {
    try {
      const order = await this.onlineOrderRepo.findOne({ where: { id: id } });
      if (!order) {
        throw new NotFoundException(`online order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new Error(
        `Error fetching online order with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateOnlineOrderDto: UpdateOnlineOrderDto,
  ): Promise<OnlineOrder> {
    try {
      const order = await this.findOne(id);
      await this.onlineOrderRepo.update(id, updateOnlineOrderDto);
      return { ...order, ...updateOnlineOrderDto };
    } catch (error) {
      throw new Error(
        `Error updating online order with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.onlineOrderRepo.delete(id);
    } catch (error) {
      throw new Error(
        `Error deleting online order with ID ${id}: ${error.message}`,
      );
    }
  }
}
