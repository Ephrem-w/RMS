import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { TakeoutOrderService } from './takeout-order.service';
import { CreateTakeoutOrderDto } from './dto/create-takeout-order.dto';
import { UpdateTakeoutOrderDto } from './dto/update-takeout-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('takeout-order')
@Controller('takeoutOrder')
export class TakeoutOrderController {
  constructor(private readonly takeoutOrderService: TakeoutOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new takeout order' })
  @ApiResponse({
    status: 201,
    description: 'The takeout order has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createTakeoutOrderDto: CreateTakeoutOrderDto) {
    try {
      return await this.takeoutOrderService.create(createTakeoutOrderDto);
    } catch (error) {
      throw new BadRequestException('Failed to create takeout order.');
    }
  }
  @Get()
  @ApiOperation({ summary: 'Get all takeout orders' })
  @ApiResponse({
    status: 200,
    description: 'All takeout orders have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    try {
      return await this.takeoutOrderService.findAll();
    } catch (error) {
      throw new NotFoundException('Failed to find takeout orders.');
    }
  }
  @Get(':id')
  @ApiOperation({ summary: 'Get takeout order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Takeout order details returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Takeout order not found.' })
  async findOne(@Param('id') id: string) {
    try {
      const result = await this.takeoutOrderService.findOne(+id);
      if (!result) {
        throw new NotFoundException('Takeout order not found.');
      }
      return result;
    } catch (error) {
      throw new NotFoundException('Failed to find takeout order.');
    }
  }
  @Put(':id')
  @ApiOperation({ summary: 'Update a takeout order' })
  @ApiResponse({
    status: 200,
    description: 'The takeout order has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updateTakeoutOrderDto: UpdateTakeoutOrderDto,
  ) {
    try {
      return await this.takeoutOrderService.update(+id, updateTakeoutOrderDto);
    } catch (error) {
      throw new BadRequestException('Failed to update takeout order.');
    }
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a takeout order' })
  @ApiResponse({
    status: 200,
    description: 'The takeout order has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.takeoutOrderService.remove(+id);
    } catch (error) {
      throw new BadRequestException('Failed to delete takeout order.');
    }
  }
}
