
enum Environments {
    local_environment = 'local',
    dev_environment = 'dev',
    prod_environment = 'prod',
    qa_environment = 'qa'
}


class Environment {
    private env: String;

    constructor(env: String) {
        this.env = env
    }

    getPort(): Number {

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

    getDBName(): String {

        switch (this.env) 
        {
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