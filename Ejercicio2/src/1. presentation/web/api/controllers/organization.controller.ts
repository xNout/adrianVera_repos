import { Request, Response, Router } from 'express';
import { inject, injectable } from 'inversify';
import { IOrganizationAppService } from '../../../../2. application/interfaces/IOrganizationAppService';
import { CreateOrganizationDto } from '../../../../3. domain/dtos/CreateOrganizationDto';
import { UpdateOrganizationDto } from '../../../../3. domain/dtos/UpdateOrganizationDto';
import { Organization } from '../../../../3. domain/entities/OrganizationEntity';
import { AppTypes } from '../app.types';
import { IController } from './controller.base';

@injectable()
export class OrganizationController implements IController
{
    private router: Router;
    private organizationAppService: IOrganizationAppService;
    public constructor( 
        @inject(AppTypes.OrganizationAppService) 
        organizationAppService: IOrganizationAppService
    )
    {
        this.organizationAppService = organizationAppService;
        this.router = Router();
        this.Create = this.Create.bind(this);
        this.Update = this.Update.bind(this);
        this.Get = this.Get.bind(this);
        this.GetAll = this.GetAll.bind(this);
        this.Delete = this.Delete.bind(this);
        this._configure = this._configure.bind(this);
    }

    Build(): Router {
        this._configure();
        return this.router;
    }

    _configure()
    {
        this.router.post("/", this.Create);
        this.router.put("/:id", this.Update);
        this.router.get("/", this.GetAll);
        this.router.get("/:id", this.Get);
        this.router.delete("/:id", this.Delete);
    }
    public async Delete(req: Request, res: Response)
    {
        let id: number = Number(req.params.id);
        let existsById = await this.organizationAppService.ExistsById(id);
        if(!existsById)
        {
            res.sendStatus(404);
        }
        else
        {
            let deleted: boolean = await this.organizationAppService.Delete(id)
            if(!deleted)
            {
                res.sendStatus(400);
            }
            else
            {
                res.sendStatus(202);
            }
        }
    }
    public async Update(req: Request, res: Response)
    {
        let id: number = Number(req.params.id);
        let model: UpdateOrganizationDto = req.body as UpdateOrganizationDto;
        let existsById = await this.organizationAppService.ExistsById(id);
        if(!existsById)
        {
            res.sendStatus(404);
        }
        else
        {
            let updated: boolean = await this.organizationAppService.Update(id, model)
            if(!updated)
            {
                res.sendStatus(400);
            }
            else
            {
                res.sendStatus(204);
            }
        }
    }
    public async Create(req: Request, res: Response)
    {
        let model: CreateOrganizationDto = req.body as CreateOrganizationDto;
        let created: Organization | null = await this.organizationAppService.Create(model);
        if(created == null)
        {
            res.sendStatus(400);
        }
        else
        {
            res.status(202).send(created);
        }
    }
    public async GetAll(req: Request, res: Response)
    {
        res.status(200).send(await this.organizationAppService.GetAll())
    }
    public async Get(req: Request, res: Response)
    {
        let id: number = Number(req.params.id);
        let organization: Organization | null = await this.organizationAppService.Get(id);
        if(organization == null)
        {
            res.sendStatus(404);
        }
        else
        {
            res.status(200).send(organization);
        }
    }
}