import repositorioInfoDto from "../../3. domain/dtos/repositorioInfoDto";
import IRepositoryService from "../../3. domain/interfaces/IRepositoryService";
import RepositoryService from "../../4. infrastructure/4.1 repositorios/RepositoryService";
import { IRepositoriosService } from "../interfaces/IRepositoriosService";


export default class RepositoriosService implements IRepositoriosService
{
    private repositoryService: IRepositoryService;
    constructor()
    {
        this.repositoryService = new RepositoryService();
        this.GetAll = this.GetAll.bind(this);
    }

    public GetAll() : repositorioInfoDto[]
    {
        return this.repositoryService.GetAll();
    }
}