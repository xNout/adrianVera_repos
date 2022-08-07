import { RepositoryVerifyState } from "../constants/AppEnums"

export interface repositorioInfoDto
{
    id: number,
    state: RepositoryVerifyState
}

export interface VerifyStateResponseDto
{
    repositories: repositorioInfoDto[]
}