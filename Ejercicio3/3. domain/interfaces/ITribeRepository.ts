import { RepositoryMetricsDto } from "../dtos/RepositoryMetricsDto";

export interface ITribeRepository
{
    GetMetrics(id: number): Promise<RepositoryMetricsDto[]>;
    Exists(id: number): Promise<boolean>;
}