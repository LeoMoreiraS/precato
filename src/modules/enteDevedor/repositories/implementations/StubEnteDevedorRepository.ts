import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { injectable } from "tsyringe";

import {
    IEnteDevedorRepository,
    EnteDevedor,
    ICreateEnteDevedorDTO,
} from "../..";

const date = new Date();
const valid_cnpj = cnpjValidator.generate();
const duplicated_cnpj = "13.161.111/0001-21";
@injectable()
export class StubEnteDevedorRepository implements IEnteDevedorRepository {
    find(id: string): Promise<EnteDevedor> {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    async findByCnpj(cnpj: string): Promise<EnteDevedor> {
        if (cnpj === duplicated_cnpj) {
            const ente_devedor = await new EnteDevedor();
            return ente_devedor;
        }
        return undefined;
    }
    list(): Promise<EnteDevedor[]> {
        throw new Error("Method not implemented.");
    }
    async create({ name, cnpj }: ICreateEnteDevedorDTO): Promise<EnteDevedor> {
        const enteDevedor = await {
            id: "valid_uuid",
            cnpj,
            name,
            updated_at: date,
            created_at: date,
        };
        return enteDevedor;
    }
}
export { valid_cnpj, duplicated_cnpj, date };
