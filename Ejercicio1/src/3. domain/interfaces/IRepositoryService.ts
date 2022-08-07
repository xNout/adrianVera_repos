import repositorioInfoDto from "../dtos/repositorioInfoDto";

export default interface IRepositoryService
{
    GetAll() : repositorioInfoDto[];
}