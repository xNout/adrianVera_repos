import { inject, injectable } from "inversify";
import { AppTypes } from "../../1. presentation/web/api/app.types";
import { CreateOrganizationDto } from "../../3. domain/dtos/CreateOrganizationDto";
import { UpdateOrganizationDto } from "../../3. domain/dtos/UpdateOrganizationDto";
import { Organization } from "../../3. domain/entities/OrganizationEntity";
import { IOrganizationRepository } from "../../3. domain/interfaces/IOrganizationRepository";
import { IOrganizationAppService } from "../interfaces/IOrganizationAppService";

@injectable()
export class OrganizationAppService implements IOrganizationAppService
{
    private organizationRepository: IOrganizationRepository;
    constructor(
        @inject(AppTypes.OrganizationRepository) 
        organizationRepository: IOrganizationRepository
    )
    {
        this.organizationRepository = organizationRepository;
    }
    async ExistsById(Id: number): Promise<boolean>
    {
        return await this.organizationRepository.ExistsById(Id);
    }
    async Delete(id: number): Promise<boolean>
    {
        return await this.organizationRepository.Delete(id);
    }
    async Update(id: number, ModelDto: UpdateOrganizationDto): Promise<boolean>
    {
        return await this.organizationRepository.Update(id, ModelDto);
    }
    async Create(ModelDto: CreateOrganizationDto): Promise<Organization | null>
    {
        let existsById = await this.organizationRepository.ExistsById(ModelDto.id);
        if(existsById)
            return null;

        let existsByName = await this.organizationRepository.ExistsByName(ModelDto.name);
        if(existsByName)
            return null;

        return await this.organizationRepository.Create(ModelDto);
    }
    async GetAll(): Promise<Organization[]> {
        return await this.organizationRepository.GetAll();
    }
    async Get(id: number) : Promise<Organization | null>
    {
        return await this.organizationRepository.Get(id);
    }
}

