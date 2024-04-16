import { Column, Entity } from 'typeorm';

@Entity({ name: 'in_inventory_item' })
export class InventoryItem {
  @Column()
  inventory_item_id: number;

  @Column()
  inventory_id: number;

  @Column()
  product_id: number;

  @Column()
  product_balance_id: number;

  @Column()
  qty: number;

  @Column()
  version: string;

  @Column()
  create_datetime: string | Date;

  @Column()
  create_username: string;

  @Column()
  update_datetime: string | Date;

  @Column()
  update_username: string;
}
