import { TribeMetricsRepoAppDto } from "../dtos/TribeMetricsRepoAppDto";

export interface ITribesAppService
{
    GetMetrics(id: number): Promise<TribeMetricsRepoAppDto>;
    Exists(id: number): Promise<boolean>;
}