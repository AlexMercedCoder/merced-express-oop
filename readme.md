## merced-express-oop

A library that allows OOP patterns when working with express.

The way this works is that this library create a Server class with basic defaults to get an app running quick.

```js
import Server from "merced-express-oop";
// create server
const server = new Server()

// create Router
const router = server.Router()

//Routes
router.get("/", (req, res) => res.send("Hello World"))

// turn on server with cors, basic logging and the router
server.cors().basiclogs().routers(["/", router]).listen()
```

## Server Constructor
`new Server({PORT: 5555})`

The Server constructor takes one argument a config object that uses the following properties.

- PORT: the port to listen on
- onListen: callback from server.listen, runs after server starts listening for requests
- host: defaults to localhost

## Methods

These methods exist on an instance of the server class, you can always use inheritance to override any of them, ideally make sure any overridden versions still return `this` so they can be chained together.

#### server.basiclogs()

Adds some very basic logging middleware you can use if not planning to use morgan or other solution (which can be registered in the middleware method). Chainable

#### server.cors(urls)

Add cors headers, with no arguments all traffic is allowed, can be passed an array of strings representing urls you want to white list. For more control over cors settings use the `cors` library and register it using the middleware method. Chainable

#### server.bodyParsers()

Enables the express.json and express.urlencoded middleware. Chainable

#### server.Router()

Returns an express Router object. Not chainable.

#### server.middleware(middleware, ["/endpoint", middlware], ...)

Register global middleware, can be passed a function or as a 2 element array. All arguments will be registered as middleware. Chainable.

#### server.routers(router, ["/endpoint", router], ...)

Register routers with the app, works like the middleware function. Chainable


#### server.staticDirs("directory", ["/endpoint", "directory"], ...)

Sets up static directories which can be passed as a string representing the directory to be served or a two element array of the endpoint and directory string. Chainable

#### server.listen

Turns on the server will either use the PORT env variable or the PORT variable passed into the config object to the constructor. It will run the onListen function if one is defined after starting server. (refer to constructor)

## Extending the Server Class

If you'd like to extend the Server class be aware the class has two properties outside of it's methods.

- `this.app`: the express application object
- `this.configs`: the object passed to the contructor

With these two properties you should be able to do pretty much anything without needing to override the constructor.

For example

```js
import Server from "merced-express-oop"
import mongoose from "mongoose"

class MyServer extends Server {
    databaseConnection(){
        mongoose.connect(this.configs.uri)
        return this
    }
}

const server = new MyServer({
    uri: "mongodb://localhost:12017/mydatabase"
    })

router.get("/", (req, res) => res.send("Hello World"))
const router = server.Router()

server.server.cors().basiclogs().databaseConnection().routers(["/", router]).listen()

```