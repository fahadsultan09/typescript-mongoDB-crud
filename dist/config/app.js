"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//lib/config/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const test_routes_1 = require("../routes/test_routes");
const common_routes_1 = require("../routes/common_routes");
class App {
    constructor() {
        this.test_routes = new test_routes_1.TestRoutes();
        this.common_routes = new common_routes_1.CommonRoutes();
        this.app = express();
        this.config();
        this.test_routes.route(this.app);
        this.common_routes.route(this.app);
    }
    config() {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
}
exports.default = new App().app;