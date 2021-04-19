import { Column, Entity } from "typeorm";
import BaseModel from "./BaseModel";

@Entity("links")
class Link extends BaseModel {
    @Column()
    longUrl: string;

    @Column()
    shortUrl: string;

    @Column({ default: 0 })
    clickCount: number;
}

export default Link;