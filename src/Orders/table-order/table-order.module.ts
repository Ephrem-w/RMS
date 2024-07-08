import { Module } from '@nestjs/common';
import { TableOrderService } from './table-order.service';
import { TableOrderController } from './table-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableOrder } from './entities/table-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TableOrder])],
  controllers: [TableOrderController],
  providers: [TableOrderService],
})
export class TableOrderModule {}
