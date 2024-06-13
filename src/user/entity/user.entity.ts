import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity({ name: 't_user', schema: 'public' })
export class User {
  @PrimaryColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'fullname' })
  tenant_id: number;

  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'password', select: false, nullable: false })
  password: string;

  @Column({ name: 'pin', select: false, nullable: false })
  pin: string;

  @Column({ name: 'role_default_id', nullable: true })
  role_default_id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'email' })
  phone: string;

  @Column({ name: 'private_key' })
  private_key: string;

  @Column({ name: 'create_datetime' })
  create_datetime: string;

  @Column({ name: 'create_user_id' })
  create_user_id: string;

  @Column({ name: 'update_datetime' })
  update_datetime: string;

  @Column({ name: 'update_user_id' })
  update_user_id: string;

  @Column({ name: 'version' })
  version: string;

  @Column({ name: 'active' })
  active: string;

  @Column({ name: 'active_datetime' })
  active_datetime: string;

  @Column({ name: 'non_active_datetime' })
  non_active_datetime: string;

  @Column({ name: 'ou_default_id' })
  ou_default_id: number;

  @Column({ name: 'policy_default_id' })
  policy_default_id: number;
}
