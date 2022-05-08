import { Field, ID, ObjectType } from "type-graphql";
import { TypeormLoader } from "type-graphql-dataloader";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
@ObjectType()
export class Character {

	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: string;

	@Column()
	@Field(() => String)
	name: string;

	@Column({ default: 1 })
	@Field(() => Number)
	level: boolean;

	@ManyToOne(() => User, user => user.characters)
	@Field((type) => User)
	@TypeormLoader()
	user: User;

}