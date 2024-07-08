import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
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
    return await this.takeoutOrderService.create(createTakeoutOrderDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all takeout orders' })
  @ApiResponse({
    status: 200,
    description: 'All takeout orders have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    return await this.takeoutOrderService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get takeout order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Takeout order details returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Takeout order not found.' })
  async findOne(@Param('id') id: string) {
    return await this.takeoutOrderService.findOne(+id);
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
    return await this.takeoutOrderService.update(+id, updateTakeoutOrderDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a takeout order' })
  @ApiResponse({
    status: 200,
    description: 'The takeout order has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    return await this.takeoutOrderService.remove(+id);
  }
}
