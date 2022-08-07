
export interface IMetricsCsvGeneratorAppService
{
    GetCsv(id: number): Promise<string>;
}