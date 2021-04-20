import {
	Column,
	CreateDateColumn,
	Generated,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";

export default abstract class BaseModel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@Generated("uuid")
	uuid: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	toJson() {
		return { ...this, id: undefined };
	}

	constructor(model: Partial<any>) {
		Object.assign(this, model);
	}
}
