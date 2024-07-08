import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableOrderModule } from './Orders/table-order/table-order.module';
import { TakeoutOrderModule } from './Orders/takeout-order/takeout-order.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OnlineOrderModule } from './Orders/online-order/online-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: ['dist/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    OnlineOrderModule,

    TakeoutOrderModule,
    TableOrderModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
