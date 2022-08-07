import { inject, injectable } from "inversify";
import { AppTypes } from "../../1. presentation/web/api/app.types";
import { RepositoryMetricsDto } from "../../3. domain/dtos/RepositoryMetricsDto";
import { ITribeRepository } from "../../3. domain/interfaces/ITribeRepository";
import { TribeMetricsRepoAppDto } from "../dtos/TribeMetricsRepoAppDto";
import { ITribesAppService } from "../interfaces/ITribesAppService";

@injectable()
export class TribesAppService implements ITribesAppService
{
    private tribeRepository: ITribeRepository;
    constructor(
        @inject(AppTypes.TribeRepository) 
        tribeRepository: ITribeRepository
    )
    {
        this.tribeRepository = tribeRepository;
    }
    public async GetMetrics(id: number): Promise<TribeMetricsRepoAppDto>
    {
        let exists = await this.tribeRepository.Exists(id);
        if(!exists)
        {
            return { mensaje: "La Tribu no se encuentra registrada" };
        }

        let metricas: RepositoryMetricsDto[] = await this.tribeRepository.GetMetrics(id);
        if(metricas.length <= 0)
        {
            return { mensaje: "La Tribu no tiene repositorios que cumplan con la cobertura necesaria" };
        }
        return { result: metricas };
    }

    public async Exists(id: number): Promise<boolean>
    {
        return await this.tribeRepository.Exists(id);
    }
}