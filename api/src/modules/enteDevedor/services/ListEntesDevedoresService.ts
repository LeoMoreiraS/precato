import { inject, injectable } from "tsyringe";

import { EnteDevedor } from "../entities/EnteDevedor";
import { IEnteDevedorRepository } from "../repositories/interfaces/IEnteDevedorRepository";

@injectable()
export class ListEntesDevedoresService {
    constructor(
        @inject("EnteDevedorRepository")
        private enteDevedorRepository: IEnteDevedorRepository
    ) {}
    async execute(): Promise<EnteDevedor[]> {
        return this.enteDevedorRepository.list();
    }
}
