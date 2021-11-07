import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { EnteDevedor } from "../entities/EnteDevedor";
import { IEnteDevedorRepository } from "../repositories/interfaces/IEnteDevedorRepository";

@injectable()
export class ListEntesDevedoresService {
    constructor(
        @inject("EnteDevedorRepository")
        private enteDevedorRepository: IEnteDevedorRepository
    ) {}
    async execute(): Promise<EnteDevedor[]> {
        const entesDevedores = await this.enteDevedorRepository.list();
        if (entesDevedores.length === 0)
            throw new AppError("No Ente Devedor was found!");
        return entesDevedores;
    }
}
