import { DataSource } from "typeorm";
import { AppConfig } from "../../../1. presentation/web/api/app.config";
import { Metrics } from "../../../3. domain/entities/MetricsEntity";
import { Organization } from "../../../3. domain/entities/OrganizationEntity";
import { Repository } from "../../../3. domain/entities/RepositoryEntity";
import { Tribe } from "../../../3. domain/entities/TribeEntity";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: AppConfig.DBString,
    synchronize: false,
    ssl: {
        ca: process.env.SSL_CERT,
    },
    logging: true,
    entities: [Organization, Tribe, Repository, Metrics],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        console.log("La base de datos se inicializo correctamente.");
    })
    .catch((error) => {
        console.log("Ocurrió un error al inicializar la base de datos")
        console.log(error);   
    })