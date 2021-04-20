import { EntityRepository, Repository } from "typeorm";
import User from "../model/User";

@EntityRepository(User)
export default class UserRepo extends Repository<User> {
	findByEmail(email: string): Promise<User | undefined> {
		return this.findOne({ email: email });
	}
}
