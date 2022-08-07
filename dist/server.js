"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./config/app");
const environments_1 = require("./environments");
const PORT = environments_1.default.getPort();
app_1.default.listen(PORT, () => {
    console.log("EXPRESS RUNNING <====>", PORT);
});
