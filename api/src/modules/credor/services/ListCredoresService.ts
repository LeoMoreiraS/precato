import { inject, injectable } from "tsyringe";

import { Credor } from "../entities/Credor";
import { ICredorRepository } from "../repositories/interfaces/ICredorRepository";

@injectable()
export class ListCredoresService {
    constructor(
        @inject("CredorRepository")
        private credorRepository: ICredorRepository
    ) {}
    async execute(): Promise<Credor[]> {
        return this.credorRepository.list();
    }
}
