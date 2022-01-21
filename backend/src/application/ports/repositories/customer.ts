import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("users")
export class UserDTO {
    @PrimaryGeneratedColumn()
    id: string;
    @Column()
    name: string;
};

