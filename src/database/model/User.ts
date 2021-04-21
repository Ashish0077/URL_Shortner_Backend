import { link } from "node:fs";
import { Column, Entity, OneToMany } from "typeorm";
import BaseModel from "./BaseModel";
import Link from "./Link";

@Entity("users")
class User extends BaseModel {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@OneToMany(() => Link, (link) => link.user)
	links: Link[];
}

export default User;
