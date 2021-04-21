import { EntityRepository, Repository } from "typeorm";
import User from "../model/User";

@EntityRepository(User)
export default class UserRepo extends Repository<User> {
	findByEmail(email: string): Promise<User | undefined> {
		return this.findOne({ email: email });
	}

	findByUuid(uuid: string): Promise<User | undefined> {
		return this.findOne({ uuid: uuid });
	}

	findById(id: number): Promise<User | undefined> {
		return this.findOne({ id: id });
	}

	async updateUser(user: User): Promise<void> {
		await this.update({ id: user.id }, user);
	}
}
