import app from "./app";
import { port } from "./config";

app.listen(port, () => {
	console.log(`App running at : http://localhost:${port}`);
});
