import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class GameKey {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  key: string;

  @Column()
  status: string;
}
