import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { Credor } from "../entities/Credor";
import { ICredorRepository } from "../repositories/interfaces/ICredorRepository";

@injectable()
export class ListCredoresService {
    constructor(
        @inject("CredorRepository")
        private credorRepository: ICredorRepository
    ) {}
    async execute(): Promise<Credor[]> {
        const credores = await this.credorRepository.list();
        if (credores.length === 0) throw new AppError("No credor was found!");
        return credores;
    }
}
