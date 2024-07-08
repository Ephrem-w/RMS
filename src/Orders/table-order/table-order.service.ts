import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTableOrderDto } from './dto/create-table-order.dto';
import { UpdateTableOrderDto } from './dto/update-table-order.dto';
import { TableOrder } from './entities/table-order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TableOrderService {
  constructor(
    @InjectRepository(TableOrder)
    private readonly tableOrderRepo: Repository<TableOrder>,
  ) {}

  async create(createTableOrderDto: CreateTableOrderDto): Promise<TableOrder> {
    const newOrder = this.tableOrderRepo.create(createTableOrderDto);
    return await this.tableOrderRepo.save(newOrder);
  }

  async findAll(): Promise<TableOrder[]> {
    try {
      return await this.tableOrderRepo.find();
    } catch (error) {
      throw new Error(`Error fetching all table orders: ${error.message}`);
    }
  }

  async findOne(id: number): Promise<TableOrder> {
    try {
      const order = await this.tableOrderRepo.findOne({ where: { id: id } });
      if (!order) {
        throw new NotFoundException(`Table order with ID ${id} not found`);
      }
      return order;
    } catch (error) {
      throw new Error(
        `Error fetching table order with ID ${id}: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateTableOrderDto: UpdateTableOrderDto,
  ): Promise<TableOrder> {
    try {
      const order = await this.findOne(id);
      await this.tableOrderRepo.update(id, updateTableOrderDto);
      return { ...order, ...updateTableOrderDto };
    } catch (error) {
      throw new Error(
        `Error updating table order with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.tableOrderRepo.delete(id);
    } catch (error) {
      throw new Error(
        `Error deleting table order with ID ${id}: ${error.message}`,
      );
    }
  }
}
