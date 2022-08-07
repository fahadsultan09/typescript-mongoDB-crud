import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import environment from "../environments";
import { UserRoutes } from "../routes/user_routes";
import { CommonRoutes } from "../routes/common_routes";

class App {

   public app: express.Application;
   public mongoUrl: string = 'mongodb://localhost/' + environment.getDBName();

   private userRoutes: UserRoutes = new UserRoutes();
   private commonRoutes: CommonRoutes = new CommonRoutes();

   constructor() {
      this.app = express();
      this.config();
      this.mongoSetup();
      this.userRoutes.route(this.app);
      this.commonRoutes.route(this.app);
   }

   private config(): void {
      // support application/json type post data
      this.app.use(bodyParser.json());
      //support application/x-www-form-urlencoded post data
      this.app.use(bodyParser.urlencoded({ extended: false }));
   }

   private mongoSetup(): void {
      try {
         mongoose.connect(this.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
      } catch (error) {
         console.log("******************* EXCEPTION connectDB ****************")
         console.log(error)
         console.log("******************* EXCEPTION connectDB ****************")
      }
   }

}
export default new App().app;