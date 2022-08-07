import { CreateOrganizationDto } from "../../3. domain/dtos/CreateOrganizationDto";
import { UpdateOrganizationDto } from "../../3. domain/dtos/UpdateOrganizationDto";
import { Organization } from "../../3. domain/entities/OrganizationEntity";

export interface IOrganizationAppService
{
    Delete(id: number): Promise<boolean>;
    Get(id: number) : Promise<Organization | null>;
    GetAll(): Promise<Organization[]>;
    Update(id: number, ModelDto: UpdateOrganizationDto): Promise<boolean>;
    ExistsById(Id: number): Promise<boolean>;
    Create(ModelDto: CreateOrganizationDto): Promise<Organization | null>;
}