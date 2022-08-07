import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IMetricsCsvGeneratorAppService } from '../../../../2. application/interfaces/IMetricsCsvGeneratorAppService';
import { AppTypes } from '../app.types';
import { IController } from './controller.base';

@injectable()
export class CsvGeneratorController implements IController
{
    private router: Router;
    private metricsCsvGeneratorAppService: IMetricsCsvGeneratorAppService;
    public constructor(
        @inject(AppTypes.MetricsCsvGeneratorAppService) 
        metricsCsvGeneratorAppService: IMetricsCsvGeneratorAppService
    )
    {
        this.metricsCsvGeneratorAppService = metricsCsvGeneratorAppService;
        this.router = Router();
        this._configure = this._configure.bind(this);
        this.GenerateCsv = this.GenerateCsv.bind(this);
    }

    Build(): Router {
        this._configure();
        return this.router;
    }

    _configure()
    {
        this.router.get("/:id", this.GenerateCsv);
    }

    public async GenerateCsv(req: Request, res: Response)
    {
        let id: number = Number(req.params.id);
        res.status(200).send(await this.metricsCsvGeneratorAppService.GetCsv(id));
    }
    
}