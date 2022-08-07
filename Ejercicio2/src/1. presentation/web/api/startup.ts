import bodyParser from 'body-parser';
import express, { Express } from 'express';
import { AppConfig } from './app.config';
import AppContainer from './app.container';
import { AppTypes } from './app.types';
import { OrganizationController } from './controllers/organization.controller';

export default class Application 
{
    private app: Express;
    constructor()
    {
        this.app = express();
        this.configureEndpoints = this.configureEndpoints.bind(this);
    }

    configureEndpoints()
    {
        const organizationEndpoint = AppContainer.get<OrganizationController>(AppTypes.OrganizationController);
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use('/organization', organizationEndpoint.Build());
    }

    run()
    {
        this.configureEndpoints();
        this.app.listen(AppConfig.puerto, () => {
            console.log("Servidor iniciado! puerto: " + AppConfig.puerto);
        });
    }
}