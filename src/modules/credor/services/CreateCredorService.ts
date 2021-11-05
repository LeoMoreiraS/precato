import { inject, injectable } from "tsyringe";

import { Credor } from "../entities/Credor";
import { ICredorRepository } from "../repositories/interfaces/ICredorRepository";

interface IRequest {
    name: string;
    cpf: string;
}
@injectable()
export class CreateCredorService {
    constructor(
        @inject("CredorRepository")
        private credorRepository: ICredorRepository
    ) {}
    async execute({ name, cpf }: IRequest): Promise<Credor> {
        const credorAlreadyExists = await this.credorRepository.findByCpf(cpf);
        if (credorAlreadyExists) throw new Error("Credor already exists");
        const credor = await this.credorRepository.create({
            name,
            cpf,
        });
        return credor;
    }
}
