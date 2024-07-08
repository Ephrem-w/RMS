import { Module } from '@nestjs/common';
import { OnlineOrderService } from './online-order.service';
import { OnlineOrderController } from './online-order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OnlineOrder } from './entities/online-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OnlineOrder])],
  controllers: [OnlineOrderController],
  providers: [OnlineOrderService],
})
export class OnlineOrderModule {}
