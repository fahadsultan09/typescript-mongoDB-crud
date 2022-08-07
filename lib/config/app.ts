//lib/config/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environments";
import { TestRoutes } from "../routes/test_routes";
import { CommonRoutes } from "../routes/common_routes";

class App {
    public app: express.Application;
    private test_routes: TestRoutes = new TestRoutes();
    private common_routes: CommonRoutes = new CommonRoutes()
    public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();
    // public mongoUrl: string = "mongodb://docker:mongopw@localhost:55000";
    constructor() {
        this.app = express();
        this.config();
        this.connectDB()
        this.test_routes.route(this.app);
        this.common_routes.route(this.app);
    }
    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    private connectDB(): void {
        try {
            mongoose.connect(this.mongoUrl);

        } catch (error) {
            console.log("******************* EXCEPTION connectDB ****************")
            console.log(error)
            console.log("******************* EXCEPTION connectDB ****************")
        }
    }
}
export default new App().app;