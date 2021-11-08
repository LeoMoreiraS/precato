import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { injectable } from "tsyringe";

import {
    IEnteDevedorRepository,
    EnteDevedor,
    ICreateEnteDevedorDTO,
} from "../..";
import { valid_ente_devedor } from "../../../payment/repositories/implementations/StubPaymentRepository";

const date = new Date();
const valid_cnpj = cnpjValidator.generate();
const duplicated_cnpj = "13.161.111/0001-21";
@injectable()
export class StubEnteDevedorRepository implements IEnteDevedorRepository {
    async find(id: string): Promise<EnteDevedor> {
        if (id === valid_ente_devedor.id) return valid_ente_devedor;
        return undefined;
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
