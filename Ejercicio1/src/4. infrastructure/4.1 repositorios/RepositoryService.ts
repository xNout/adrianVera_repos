import IRepositoryService from '../../3. domain/interfaces/IRepositoryService';
import repositorioInfoDto from '../../3. domain/dtos/repositorioInfoDto';

interface IDatabase {
    repositorios: repositorioInfoDto[]
}

export default class RepositoryService implements IRepositoryService
{
    private database: IDatabase;
    constructor()
    {
        this.database = {
            repositorios: [
                { id: 1, state: 604 },
                { id: 2, state: 605 },
                { id: 3, state: 606 },
            ]
        };

        this.GetAll = this.GetAll.bind(this);
    }

    public GetAll() : repositorioInfoDto[]
    {
        return this.database.repositorios;
    }
}