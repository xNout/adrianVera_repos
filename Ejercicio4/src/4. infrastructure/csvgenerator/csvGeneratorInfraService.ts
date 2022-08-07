import { injectable } from "inversify";
import { RepositoryMetricsDto } from "../../3. domain/dtos/RepositoryMetricsDto";
import { ICsvGeneratorInfraService } from "../../3. domain/interfaces/ICsvGeneratorInfraService";

@injectable()
export class CsvGeneratorInfraService implements ICsvGeneratorInfraService
{

    public Generate(Metrics: RepositoryMetricsDto[]): string
    {
        let csvRecipiente: string[] = ["id;name;tribe;organization;coverage;codeSmells;bugs;vulnerabilities;hotspots;verificationState;state"];
        Metrics.forEach(item => {
            csvRecipiente.push(`${item.id};${item.name};${item.tribe};${item.organization};${item.coverage};${item.codeSmells};${item.bugs};${item.vulnerabilities};${item.hotspots};${item.verificationState};${item.state}`)
        });

        return csvRecipiente.join("\n");
    }
}