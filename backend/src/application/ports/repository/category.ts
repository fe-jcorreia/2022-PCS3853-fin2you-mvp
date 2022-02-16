import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { UserDTO } from "./user";
import { ExtractDTO } from "./extract";

@Entity("categories")
export class CategoryDTO {
    @PrimaryGeneratedColumn()
    id?: string;
    @Column()
    name: string;
    @ManyToOne(() => UserDTO, user => user.categories)
    user: UserDTO
    @OneToMany(() => ExtractDTO, extract => extract.category)
    extracts: ExtractDTO
};

