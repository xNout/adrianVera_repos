
export interface repositorioInfoDto
{
    id: number,
    state: number
}

export interface VerifyStateResponseDto
{
    repositories: repositorioInfoDto[]
}