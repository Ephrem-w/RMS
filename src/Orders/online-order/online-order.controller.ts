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
import { OnlineOrderService } from './online-order.service';
import { CreateOnlineOrderDto } from './dto/create-online-order.dto';
import { UpdateOnlineOrderDto } from './dto/update-online-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('online-orders')
@Controller('onlineOrder')
export class OnlineOrderController {
  constructor(private readonly onlineOrderService: OnlineOrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new online order' })
  @ApiResponse({
    status: 201,
    description: 'The online order has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(@Body() createOnlineOrderDto: CreateOnlineOrderDto) {
    try {
      return await this.onlineOrderService.create(createOnlineOrderDto);
    } catch (error) {
      throw new HttpException(
        'Failed to create online order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'Get all online orders' })
  @ApiResponse({
    status: 200,
    description: 'All online orders have been successfully retrieved.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findAll() {
    try {
      return await this.onlineOrderService.findAll();
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve online orders',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get online order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Online order details returned successfully.',
  })
  @ApiResponse({ status: 404, description: 'Online order not found.' })
  async findOne(@Param('id') id: string) {
    try {
      return await this.onlineOrderService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to retrieve online order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an online order' })
  @ApiResponse({
    status: 200,
    description: 'The online order has been successfully updated.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async update(
    @Param('id') id: string,
    @Body() updateOnlineOrderDto: UpdateOnlineOrderDto,
  ) {
    try {
      return await this.onlineOrderService.update(+id, updateOnlineOrderDto);
    } catch (error) {
      throw new HttpException(
        'Failed to update online order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an online order' })
  @ApiResponse({
    status: 200,
    description: 'The online order has been successfully deleted.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async remove(@Param('id') id: string) {
    try {
      return await this.onlineOrderService.remove(+id);
    } catch (error) {
      throw new HttpException(
        'Failed to delete online order',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
