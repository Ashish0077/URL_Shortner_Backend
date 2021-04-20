import { EntityRepository, Repository } from "typeorm";
import Link from "../model/Link";

@EntityRepository(Link)
export default class LinkRepo extends Repository<Link> {
	findByUuid(uuid: string): Promise<Link | undefined> {
		return this.findOne({ uuid: uuid });
	}

	findByShortUrl(shortUrl: string): Promise<Link | undefined> {
		return this.findOne({ shortUrl: shortUrl });
	}
}
