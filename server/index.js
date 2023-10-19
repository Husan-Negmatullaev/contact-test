import jsonServer from "json-server";
import path from "path";

const server = jsonServer.create();
const router = jsonServer.router(
	path.join(__dirname, "server", "database.json"),
);
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
	if (req.headers.Authorization) {
		next();
	} else {
		res.sendStatus(401);
	}
});

server.listen(3000, () => {
	console.log("JSON Server is running");
});
