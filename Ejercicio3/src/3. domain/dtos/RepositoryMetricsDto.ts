export interface RepositoryMetricsDto
{
    id: number | undefined, // id repo
    name: string | undefined, // repo name
    tribe: string | undefined,
    organization: string | undefined,
    coverage: string | undefined,
    codeSmells: number | undefined,
    bugs: number | undefined,
    vulnerabilities: number | undefined,
    hotspots: number | undefined,
    verificationState: string | undefined,
    state: string | undefined
}