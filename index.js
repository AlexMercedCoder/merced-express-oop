import express from "express"

////////////////////////////////////
// Server Class
////////////////////////////////////
class Server {

    constructor(configs = {PORT:3000, host: "localhost"}){
        this.app = express()
        this.configs = configs
    }

    basiclogs(){
        this.app.use((req, res, next) => {
            console.log("------------Request Log---------------")
            console.table({method: req.method, url: req.baseUrl, host: req.hostname})
            next()
        })
        return this
    }

    bodyParsers(){
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
        return this
    }

    Router(){
        return express.Router()
    }

    cors(urls){
        if (urls){
            this.app.use((req, res, next) => {
                res.set("Access-Control-Allow-Origin", urls.join(","))
                res.set("Access-Control-Allow-Methods", "*")
                res.set("Access-Control-Allow-Headers", "*")
                res.set("Access-Control-Max-Age", 86400)
                next()
            })
        } else {
            this.app.use((req, res, next) => {
                res.set("Access-Control-Allow-Origin", "*")
                res.set("Access-Control-Allow-Methods", "*")
                res.set("Access-Control-Allow-Headers", "*")
                res.set("Access-Control-Max-Age", 86400)
                next()
            })
        }
        return this
    }

    middlware(...args){
        for (let arg of args){
            if (arg instanceof Array){
                this.app.use(arg[0], [arg[1]])
            } else if (arg instanceof Function){
                this.app.use(arg)
            } else {
                throw("Arguments must either be two element array ['/endpoint', Function] or a function")
            }
        }
        return this
    }

    routers(...args){
        for (let arg of args){
            if (arg instanceof Array){
                this.app.use(arg[0], [arg[1]])
            } else if (arg instanceof Function){
                this.app.use(arg)
            } else {
                throw("Arguments must either be two element array ['/endpoint', Function] or a function")
            }
        }
        return this
    }

    staticDirs(...args){
        for (let arg of args){
            if (arg instanceof Array){
                this.app.use(arg[0], express.static([arg[1]]))
            } else if (arg instanceof String){
                this.app.use(express.static(arg))
            } else {
                throw("Arguments must either be two element array ['/endpoint', 'director'] or 'directory'")
            }
        }
        return this

    }

    listen(){
        const PORT = process.env.PORT || this.configs.PORT || 3000
        const listenfunc = () => console.log(`listening on PORT ${PORT}`)
        const onListen = this.configs.onListen || listenfunc
        this.app.listen(PORT,this.configs.host, onListen)
    }

}

export default Server