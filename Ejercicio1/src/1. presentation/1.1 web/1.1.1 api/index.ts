import express, { Express } from 'express';
import { AppConfig } from './app.config';
import repositorios from './controllers/repositorios.controller';

export default class Application 
{
    private app: Express;
    constructor()
    {
        this.app = express();
    }


    run()
    {
        this.app.use('/api', repositorios);
        this.app.listen(AppConfig.puerto, () => {
            console.log("Servidor iniciado! puerto: " + AppConfig.puerto);
        });
    }
}