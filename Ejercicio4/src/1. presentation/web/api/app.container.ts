import { Container } from "inversify";
import { MetricsCsvGeneratorAppService } from "../../../2. application/appservice/MetricsCsvGeneratorAppService";
import { IMetricsCsvGeneratorAppService } from "../../../2. application/interfaces/IMetricsCsvGeneratorAppService";
import { ICsvGeneratorInfraService } from "../../../3. domain/interfaces/ICsvGeneratorInfraService";
import { CsvGeneratorInfraService } from "../../../4. infrastructure/csvgenerator/csvGeneratorInfraService";
import { AppTypes } from "./app.types";
import { CsvGeneratorController } from "./controllers/csvgenerator.controller";

class AppContainer 
{
    private container: Container;
    constructor()
    {
        this.container = new Container();
        this.AddServices = this.AddServices.bind(this);
    }
    
    public AddServices()
    {
        this.container.bind<IMetricsCsvGeneratorAppService>(AppTypes.MetricsCsvGeneratorAppService).to(MetricsCsvGeneratorAppService);
        this.container.bind<CsvGeneratorController>(AppTypes.CsvGeneratorController).to(CsvGeneratorController);
        this.container.bind<ICsvGeneratorInfraService>(AppTypes.CsvGeneratorInfraService).to(CsvGeneratorInfraService);
        return this;
    }

    public Build(){
        return this.container;
    }
}

export default new AppContainer().AddServices().Build();