The config.json file is used to describe how to connect to sql lite or how to connect to a sql server.

config.json information

    Development section is what database is used when working on the app locally
        storage is the name of the database you are connecting to
        dialect is the language the database uses.

    Production section is what is used after deploying to Azure
        username includes a value to be replaced
        host includes a value to be replaced
        database includes a value to be replaced
        dialect being used is mssql which is microsoft sequel server