import { Column, Entity, ManyToMany, ManyToOne } from "typeorm";
import BaseModel from "./BaseModel";
import User from "./User";

@Entity("links")
class Link extends BaseModel {
	@Column()
	longUrl: string;

	@Column()
	shortUrl: string;

	@Column({ default: 0 })
	clickCount: number;

	@ManyToOne(() => User, (user) => user.links)
	user: User;
}

export default Link;
