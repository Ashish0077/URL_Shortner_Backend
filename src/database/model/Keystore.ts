import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import BaseModel from "./BaseModel";
import User from "./User";

@Entity("keystore")
export default class Keystore extends BaseModel {
	@OneToOne(() => User)
	@JoinColumn()
	client: User;

	// access token key
	@Column()
	primaryKey: string;

	// refresh token key
	@Column()
	secondaryKey: string;

	@Column({ default: true })
	status: boolean;
}
