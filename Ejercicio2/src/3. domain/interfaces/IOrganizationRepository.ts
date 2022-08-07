import { CreateOrganizationDto } from "../dtos/CreateOrganizationDto";
import { UpdateOrganizationDto } from "../dtos/UpdateOrganizationDto";
import { Organization } from "../entities/OrganizationEntity";

export interface IOrganizationRepository
{
    Delete(id: number): Promise<boolean>;
    ExistsById(id: number): Promise<boolean>;
    ExistsByName(name: string): Promise<boolean>;
    Update(id: number, ModelDto: UpdateOrganizationDto): Promise<boolean>;
    Create(ModelDto: CreateOrganizationDto) : Promise<Organization | null>;
    GetAll() : Promise<Organization[]>;
    Get(id: number) : Promise<Organization | null>;
}