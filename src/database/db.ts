import { createConnection } from "typeorm";

export default async function connectDB(): Promise<void> {
	try {
		await createConnection();
		console.log("DB CONNECTED!");
	} catch (err) {
		console.log(err);
	}
}
