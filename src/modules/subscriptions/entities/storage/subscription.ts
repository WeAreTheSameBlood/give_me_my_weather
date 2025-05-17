import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  city: string;

  @Column()
  frequency: string;

  @Column({ default: false })
  confirmed: boolean;
}