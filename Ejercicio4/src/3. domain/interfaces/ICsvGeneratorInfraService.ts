import { RepositoryMetricsDto } from "../dtos/RepositoryMetricsDto";

export interface ICsvGeneratorInfraService
{
    Generate(Metrics: RepositoryMetricsDto[]): string;
}