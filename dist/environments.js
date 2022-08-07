"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Environments;
(function (Environments) {
    Environments["local_environment"] = "local";
    Environments["dev_environment"] = "dev";
    Environments["prod_environment"] = "prod";
    Environments["qa_environment"] = "qa";
})(Environments || (Environments = {}));
class Environment {
    constructor(env) {
        this.env = env;
    }
    getPort() {
        switch (this.env) {
            case Environments.prod_environment:
                return 8081;
            case Environments.dev_environment:
                return 8082;
            case Environments.qa_environment:
                return 8083;
            case Environments.local_environment:
                return 3000;
            default:
                return 3000;
        }
    }
    getDBName() {
        switch (this.env) {
            case Environments.prod_environment:
                return "db_test_project_prod";
            case Environments.dev_environment:
                return 'db_test_project_dev';
            case Environments.qa_environment:
                return 'db_test_project_qa';
            case Environments.local_environment:
                return 'db_test_project_local';
            default:
                return 'db_test_project_local';
        }
    }
}
exports.default = new Environment(Environments.local_environment);
