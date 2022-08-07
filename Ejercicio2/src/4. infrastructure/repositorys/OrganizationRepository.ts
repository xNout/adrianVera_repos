import { injectable } from "inversify";
import { Repository } from "typeorm";
import { Organization } from "../../3. domain/entities/OrganizationEntity";
import { IOrganizationRepository } from "../../3. domain/interfaces/IOrganizationRepository";
import { AppDataSource } from "./Model/db.source";
import { CreateOrganizationDto } from '../../3. domain/dtos/CreateOrganizationDto';
import { UpdateOrganizationDto } from "../../3. domain/dtos/UpdateOrganizationDto";
@injectable()
export class OrganizationRepository implements IOrganizationRepository
{
    private orgRepository: Repository<Organization>;
    constructor()
    {
        this.orgRepository = AppDataSource.getRepository(Organization);
    }
    public async ExistsById(id: number): Promise<boolean>
    {
        let count: number = await this.orgRepository
            .createQueryBuilder("org")
            .where("org.id_organization = :id", { id: id})
            .getCount();
        return count > 0;
    }
    public async ExistsByName(name: string): Promise<boolean>
    {
        let count: number = await this.orgRepository
            .createQueryBuilder("org")
            .where("org.name = :name", { name: name })
            .getCount();
        return count > 0;
    }
    public async Delete(id: number): Promise<boolean>
    {
        let organization: Organization | null = await this.orgRepository.findOneBy( { id_organization: id});
        if(organization == null)
        {
            return false;
        }
        await this.orgRepository.remove(organization);
        return true;
    }
    public async Update(id: number, ModelDto: UpdateOrganizationDto): Promise<boolean>
    {
        let organization: Organization | null = await this.orgRepository.findOneBy( { id_organization: id});
        if(organization == null)
        {
            return false;
        }
        organization.name = ModelDto.name;
        organization.status = ModelDto.status;
        await this.orgRepository.save(organization);
        return true;
    }
    public async Create(ModelDto: CreateOrganizationDto) : Promise<Organization | null>
    {
        let newOrg: Organization = new Organization();
        newOrg.id_organization = ModelDto.id;
        newOrg.name = ModelDto.name;
        newOrg.status = ModelDto.status;

        this.orgRepository.save(newOrg);
        return newOrg;
    }
    public async GetAll() : Promise<Organization[]>
    {
        return await this.orgRepository.find();
    }
    public async Get(id: number) : Promise<Organization | null>
    {
        return await this.orgRepository.findOne({ where: { id_organization: id}});
    }
}