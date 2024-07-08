// table-ordering.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Customer } from './customer.entity';

@Entity()
export class TableOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableNumber: number;

  @Column()
  items: string; // You might want to use a more complex type for items

  @Column()
  totalPrice: number;

  @Column()
  orderTime: string;

  //   @ManyToOne(() => Customer, (customer) => customer.tableOrders)
  //   customer: Customer;
}
