import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { EnteDevedor } from "../entities/EnteDevedor";
import { IEnteDevedorRepository } from "../repositories/interfaces/IEnteDevedorRepository";

interface IRequest {
    name: string;
    cnpj: string;
}
@injectable()
export class CreateEnteDevedorService {
    constructor(
        @inject("EnteDevedorRepository")
        private enteDevedorRepository: IEnteDevedorRepository
    ) {}
    async execute({ name, cnpj }: IRequest): Promise<EnteDevedor> {
        const cnpjIsValid = cnpjValidator.isValid(cnpj);
        if (!cnpjIsValid) {
            throw new AppError("Invalid cnpj number!");
        }

        const enteDevedorAlreadyExists =
            await this.enteDevedorRepository.findByCnpj(cnpj);
        if (enteDevedorAlreadyExists) {
            throw new AppError("Ente Devedor already exists!");
        }

        return this.enteDevedorRepository.create({
            name,
            cnpj,
        });
    }
}
