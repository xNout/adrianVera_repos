import { Container } from "inversify";
import { TribesAppService } from "../../../2. application/appservices/TribesAppService";
import { ITribesAppService } from "../../../2. application/interfaces/ITribesAppService";
import { ITribeRepository } from "../../../3. domain/interfaces/ITribeRepository";
import { IVerifyStateRepository } from "../../../3. domain/interfaces/IVerifyStateRepository";
import { TribeRepository } from "../../../4. infrastructure/repositorys/TribeRepository";
import { VerifyStateRepository } from "../../../4. infrastructure/repositorys/VerifyStateRepository";
import { AppTypes } from "./app.types";
import { TribeController } from "./controllers/tribe.controller";

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
        this.container.bind<ITribesAppService>(AppTypes.TribesAppService).to(TribesAppService);
        this.container.bind<ITribeRepository>(AppTypes.TribeRepository).to(TribeRepository);
        this.container.bind<TribeController>(AppTypes.TribeController).to(TribeController);
        this.container.bind<IVerifyStateRepository>(AppTypes.VerifyStateRepository).to(VerifyStateRepository);
        return this;
    }

    public Build(){
        return this.container;
    }
}

export default new AppContainer().AddServices().Build();