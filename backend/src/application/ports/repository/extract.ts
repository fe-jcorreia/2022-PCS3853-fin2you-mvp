import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserDTO } from "./user";
import { CategoryDTO } from "./category";

@Entity("extracts")
export class ExtractDTO {
    @PrimaryGeneratedColumn()
    id?: string;
    @Column()
    value: number;
    @Column()
    timeStamp: string;
    @ManyToOne(() => UserDTO, user => user.extracts)
    user: UserDTO
    @ManyToOne(() => CategoryDTO, category => category.extracts)
    category: CategoryDTO
};

