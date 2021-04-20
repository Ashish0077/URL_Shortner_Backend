import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";

@Entity("users")
class User extends BaseModel {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;
}

export default User;
