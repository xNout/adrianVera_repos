import { Container } from "inversify";
import { OrganizationAppService } from "../../../2. application/appservices/OrganizationAppService";
import { IOrganizationAppService } from "../../../2. application/interfaces/IOrganizationAppService";
import { IOrganizationRepository } from "../../../3. domain/interfaces/IOrganizationRepository";
import { OrganizationRepository } from "../../../4. infrastructure/repositorys/OrganizationRepository";
import { AppTypes } from "./app.types";
import { OrganizationController } from "./controllers/organization.controller";


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
        this.container.bind<IOrganizationAppService>(AppTypes.OrganizationAppService).to(OrganizationAppService);
        this.container.bind<IOrganizationRepository>(AppTypes.OrganizationRepository).to(OrganizationRepository);
        this.container.bind<OrganizationController>(AppTypes.OrganizationController).to(OrganizationController);
        return this;
    }

    public Build(){
        return this.container;
    }
}

export default new AppContainer().AddServices().Build();