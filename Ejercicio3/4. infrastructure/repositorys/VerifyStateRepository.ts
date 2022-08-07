import { injectable } from "inversify";
import axios from 'axios';
import { AppConfig } from "../../1. presentation/web/api/app.config";
import { repositorioInfoDto, VerifyStateResponseDto } from "../../3. domain/dtos/VerifyStateResponseDto";
import { IVerifyStateRepository } from "../../3. domain/interfaces/IVerifyStateRepository";

@injectable()
export class VerifyStateRepository implements IVerifyStateRepository
{

    constructor()
    {

    }

    
    public async GetStates(): Promise<repositorioInfoDto[]>
    {
        try
        {
            const { data, status } = await axios.get<VerifyStateResponseDto>(AppConfig.MockUrl);

            console.log(status);
            if(status != 200)
            {
                return [];
            }
            return data.repositories;
        }
        catch(err)
        {
            console.log("Servicio de verificar estado no activo");
            return [];
        }
        
    }

    
}