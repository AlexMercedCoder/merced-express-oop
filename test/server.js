import Server from "../index.js";
// create server
const server = new Server()

// create Router
const router = server.Router()

//Routes
router.get("/", (req, res) => res.send("Hello World"))

// turn on server with cors, basic logging and the router
server.cors().basiclogs().routers(["/", router]).listen()