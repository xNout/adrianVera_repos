import axios from "axios";
import { inject, injectable } from "inversify";
import { AppConfig } from "../../1. presentation/web/api/app.config";
import { AppTypes } from "../../1. presentation/web/api/app.types";
import { RepositoryMetricsDto } from "../../3. domain/dtos/RepositoryMetricsDto";
import { ICsvGeneratorInfraService } from "../../3. domain/interfaces/ICsvGeneratorInfraService";
import { IMetricsCsvGeneratorAppService } from "../interfaces/IMetricsCsvGeneratorAppService";

@injectable()
export class MetricsCsvGeneratorAppService implements IMetricsCsvGeneratorAppService
{
    private csvGeneratorInfraService: ICsvGeneratorInfraService;
    constructor(
        @inject(AppTypes.CsvGeneratorInfraService) 
        csvGeneratorInfraService: ICsvGeneratorInfraService
    )
    {
        this.csvGeneratorInfraService = csvGeneratorInfraService;
    }

    public async GetCsv(id: number): Promise<string>
    {
        let csvGenerated: string = "";
        try
        {
            const { data, status } = await axios.get<RepositoryMetricsDto[] | string>(`${AppConfig.MetricsUrl}${id}`);
            if(status == 404)
            {
                csvGenerated = data as string;
                return csvGenerated;
            }
            
            csvGenerated = this.csvGeneratorInfraService.Generate(data as RepositoryMetricsDto[]);
            return csvGenerated;
        }
        catch(err: any)
        {
            return err?.response?.data || "Ocurrió un error al consultar las metricas";
        }
    }
}