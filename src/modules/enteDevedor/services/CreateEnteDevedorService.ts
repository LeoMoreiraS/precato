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
        if (!cnpjIsValid) throw new AppError("Invalid cnpj number!");
        const credorAlreadyExists = await this.enteDevedorRepository.findByCnpj(
            cnpj
        );
        if (credorAlreadyExists) throw new AppError("Credor already exists!");
        const enteDevedor = await this.enteDevedorRepository.create({
            name,
            cnpj,
        });
        return enteDevedor;
    }
}
