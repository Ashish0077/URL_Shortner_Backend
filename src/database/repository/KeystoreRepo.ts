import { EntityRepository, Repository } from "typeorm";
import Keystore from "../model/Keystore";
import User from "../model/User";

@EntityRepository(Keystore)
export default class KeystoreRepo extends Repository<Keystore> {
	findforKey(client: User, key: string): Promise<Keystore | undefined> {
		return this.findOne({ client: client, primaryKey: key, status: true });
	}
}
