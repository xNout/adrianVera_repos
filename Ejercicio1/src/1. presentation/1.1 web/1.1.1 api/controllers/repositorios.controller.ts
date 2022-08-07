import { Router, Request, Response } from 'express';
import RepositoriosService from '../../../../2. application/appservices/repositoriosService';
import RepositoriosResponseAppDto from '../../../../2. application/dtos/RepositoriosResponseAppDto';
import { IRepositoriosService } from '../../../../2. application/interfaces/IRepositoriosService';
class RepositoriosController 
{
    public router: Router;
    private repositoryService: IRepositoriosService;
    constructor()
    {
        this.router = Router();
        this.repositoryService = new RepositoriosService();
        this.GetAll = this.GetAll.bind(this);
        this._configure = this._configure.bind(this);

        this._configure();
    }

    _configure()
    {
        this.router.get("/repositorios", this.GetAll);
    }

    public GetAll(req: Request, res: Response)
    {
        let response: RepositoriosResponseAppDto = {
            repositories: this.repositoryService.GetAll()
        };
        res.json(response);
    }
}

export default new RepositoriosController().router;