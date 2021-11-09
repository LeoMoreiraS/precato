import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { Credor } from "../entities/Credor";
import { ICredorRepository } from "../repositories/interfaces/ICredorRepository";

interface IRequest {
    approval: boolean;
    cpf: string;
}
@injectable()
export class UpdateCredorStatusService {
    constructor(
        @inject("CredorRepository")
        private credorRepository: ICredorRepository
    ) {}
    async execute({ approval, cpf }: IRequest): Promise<Credor> {
        const cpfIsValid = cpfValidator.isValid(cpf);
        if (!cpfIsValid) {
            throw new AppError("Invalid cpf number!");
        }

        const credorExists = await this.credorRepository.findByCpf(cpf);
        if (!credorExists) {
            throw new AppError("Credor not found!");
        }

        const status = approval ? "Approved" : "Rejected";
        return this.credorRepository.updateStatus({
            status,
            cpf,
        });
    }
}
