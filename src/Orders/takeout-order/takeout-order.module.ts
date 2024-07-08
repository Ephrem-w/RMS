import { Module } from '@nestjs/common';
import { TakeoutOrderService } from './takeout-order.service';
import { TakeoutOrderController } from './takeout-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TakeoutOrder } from './entities/takeout-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TakeoutOrder])],
  controllers: [TakeoutOrderController],
  providers: [TakeoutOrderService],
})
export class TakeoutOrderModule {}
