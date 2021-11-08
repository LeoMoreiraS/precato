import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { injectable } from "tsyringe";

import { ICreateCredorDTO, ICredorRepository } from "../..";
import { IUpdateStatusCredorDTO } from "../../DTOs/IUpdateStatusCredorDTO";
import { Credor } from "../../entities/Credor";

const date = new Date();
const valid_cpf = cpfValidator.generate();
const duplicated_cpf = "126.229.456-80";

@injectable()
export class StubCredorRepository implements ICredorRepository {
    find(id: string): Promise<Credor> {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    list(): Promise<Credor[]> {
        throw new Error("Method not implemented.");
    }
    async updateStatus({
        status,
        cpf,
    }: IUpdateStatusCredorDTO): Promise<Credor> {
        const credor: Credor = await {
            id: "valid_uuid",
            cpf,
            name: "credor_name",
            status,
            updated_at: date,
            created_at: date,
        };
        return credor;
    }
    async create({ name, cpf }: ICreateCredorDTO): Promise<Credor> {
        const credor: Credor = await {
            id: "valid_uuid",
            cpf,
            name,
            status: "created",
            updated_at: date,
            created_at: date,
        };
        return credor;
    }
    async findByCpf(cpf: string): Promise<Credor> {
        if (cpf === duplicated_cpf) {
            const credor = await new Credor();
            return credor;
        }
        return undefined;
    }
}

export { valid_cpf, date, duplicated_cpf };
