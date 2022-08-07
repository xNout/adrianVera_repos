import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { TribeMetricsRepoAppDto } from '../../../../2. application/dtos/TribeMetricsRepoAppDto';
import { ITribesAppService } from '../../../../2. application/interfaces/ITribesAppService';
import { AppTypes } from '../app.types';
import { IController } from './controller.base';

@injectable()
export class TribeController implements IController
{
    private router: Router;
    private tribesAppService: ITribesAppService;
    public constructor(
        @inject(AppTypes.TribesAppService) 
        tribesAppService: ITribesAppService
    )
    {
        this.tribesAppService = tribesAppService;
        this.router = Router();
        this._configure = this._configure.bind(this);
        this.GetRepositorysMetrics = this.GetRepositorysMetrics.bind(this);
    }

    Build(): Router {
        this._configure();
        return this.router;
    }

    _configure()
    {
        this.router.get("/metrics/:id", this.GetRepositorysMetrics);
    }

    public async GetRepositorysMetrics(req: Request, res: Response)
    {
        let id: number = Number(req.params.id);
        let TribuMetrics: TribeMetricsRepoAppDto = await this.tribesAppService.GetMetrics(id);
        if(TribuMetrics.mensaje != null)
        {
            return res.status(404).send(TribuMetrics.mensaje);
        }
        
        res.status(200).send(TribuMetrics.result);
    }
    
}