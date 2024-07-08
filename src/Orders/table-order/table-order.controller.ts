import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
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
    return await this.tableOrderService.create(createTableOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all table orders' })
  @ApiResponse({
    status: 200,
    description: 'All table orders have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return await this.tableOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get table order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Table order details returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Table order not found.' })
  async findOne(@Param('id') id: string) {
    return await this.tableOrderService.findOne(+id);
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
    return await this.tableOrderService.update(+id, updateTableOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a table order' })
  @ApiResponse({
    status: 200,
    description: 'The table order has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    return await this.tableOrderService.remove(+id);
  }
}
