import repositorioInfoDto from "../../3. domain/dtos/repositorioInfoDto";

export interface IRepositoriosService
{
    GetAll() : repositorioInfoDto[];
}