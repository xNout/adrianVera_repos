import { repositorioInfoDto } from "../dtos/VerifyStateResponseDto";

export interface IVerifyStateRepository
{
    GetStates(): Promise<repositorioInfoDto[]>;
}