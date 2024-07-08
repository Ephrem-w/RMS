import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TableOrderService } from './table-order.service';
import { CreateTableOrderDto } from './dto/create-table-order.dto';
import { UpdateTableOrderDto } from './dto/update-table-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('table-orders')
@Controller('tableOrder')
export class TableOrderController {
  constructor(private readonly tableOrderService: TableOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new table order' })
  @ApiResponse({
    status: 201,
    description: 'The table order has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createTableOrderDto: CreateTableOrderDto) {
    try {
      return await this.tableOrderService.create(createTableOrderDto);
      // Return something meaningful if needed
    } catch (error) {
      throw new HttpException(
        `Failed to create table order: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all table orders' })
  @ApiResponse({
    status: 200,
    description: 'All table orders have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    try {
      return await this.tableOrderService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve table orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get table order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Table order details returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Table order not found.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.tableOrderService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve table order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a table order' })
  @ApiResponse({
    status: 200,
    description: 'The table order has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updateTableOrderDto: UpdateTableOrderDto,
  ) {
    try {
      return await this.tableOrderService.update(+id, updateTableOrderDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update table order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a table order' })
  @ApiResponse({
    status: 200,
    description: 'The table order has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.tableOrderService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete table order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
