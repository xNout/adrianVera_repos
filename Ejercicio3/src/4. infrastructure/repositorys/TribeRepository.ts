import { inject, injectable } from "inversify";
import { Repository } from "typeorm";
import { AppTypes } from "../../1. presentation/web/api/app.types";
import { RepositoryState, RepositoryVerifyState } from "../../3. domain/constants/AppEnums";
import { RepositoryMetricsDto } from "../../3. domain/dtos/RepositoryMetricsDto";
import { repositorioInfoDto } from "../../3. domain/dtos/VerifyStateResponseDto";
import { Tribe } from "../../3. domain/entities/TribeEntity";
import { ITribeRepository } from "../../3. domain/interfaces/ITribeRepository";
import { IVerifyStateRepository } from "../../3. domain/interfaces/IVerifyStateRepository";
import { AppDataSource } from "./Model/db.source";
@injectable()
export class TribeRepository implements ITribeRepository
{
    private tribeRepository: Repository<Tribe>;
    private verifyStateRepository: IVerifyStateRepository;
    constructor(
        @inject(AppTypes.VerifyStateRepository) 
        verifyStateRepository: IVerifyStateRepository
    )
    {
        this.verifyStateRepository = verifyStateRepository;
        this.tribeRepository = AppDataSource.getRepository(Tribe);
    }
    public async GetMetrics(id: number): Promise<RepositoryMetricsDto[]>
    {
        let hoy = new Date()
        let desde = new Date(hoy.getFullYear(), 0, 1, 0, 0, 0);
        let hasta = new Date(hoy.getFullYear(), 11, 31, 23, 59, 59);
        let result: Tribe | null = await this.tribeRepository
            .createQueryBuilder("tribe")
            .leftJoinAndSelect("tribe.organization", "organization")
            .leftJoinAndSelect("tribe.repositorys", "repository")
            .leftJoinAndSelect("repository.metrics", "metrics")
            .where("tribe.id_tribe = :id", { id: id } )
            .andWhere(`repository.create_time BETWEEN '${desde.toISOString()}' AND '${hasta.toISOString()}'` )
            .andWhere("repository.state = :state", { state: "E" } )
            .andWhere("metrics.coverage >= :coverage", { coverage: 75 })
            .getOne();

        let resultMapped: RepositoryMetricsDto[] = [];
        if(result == null)
        {
            return resultMapped;
        }

        let states: repositorioInfoDto[] = await this.verifyStateRepository.GetStates();
        result.repositorys?.forEach(item => {
            let repoVerifyState: repositorioInfoDto | null = states.filter(x => x.id == item.id_repository)[0];
            let repoState: any = item.state || "";
            resultMapped.push({
                id: item.id_repository,
                name: item?.name?.trim(),
                tribe: result?.name?.trim(),
                organization: result?.organization?.name?.trim(),
                coverage: `${item.metrics?.coverage}%`,
                codeSmells: item.metrics?.code_smells,
                bugs: item.metrics?.bugs,
                vulnerabilities: item.metrics?.vulnerabilities,
                hotspots: item.metrics?.hotspot,
                verificationState: this.GetVerifyStateXCode(repoVerifyState?.state),
                state: (RepositoryState[repoState] as string)
            });
        });
        return resultMapped;
    }
    private GetVerifyStateXCode(state: RepositoryVerifyState): string
    {
        if(state == RepositoryVerifyState.Verificado)
        {
            return "Verificado";
        }
        else if(state == RepositoryVerifyState.EnEspera)
        {
            return "En Espera";
        }
        else
        {
            return "Aprobado";
        }
    }
    public async Exists(id: number): Promise<boolean>
    {
        let count: number = await this.tribeRepository
            .createQueryBuilder("trib")
            .where("trib.id_tribe = :id", { id: id })
            .getCount();

        return count > 0;
    }
}