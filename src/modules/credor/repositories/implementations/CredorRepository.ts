import { getRepository, Repository } from "typeorm";

import { ICreateCredorDTO } from "../../DTOs/ICreateCredorDTO";
import { Credor } from "../../entities/Credor";
import { ICredorRepository } from "../interfaces/ICredorRepository";

export class CredorRepository implements ICredorRepository {
    private ormRepository: Repository<Credor>;
    constructor() {
        this.ormRepository = getRepository(Credor);
    }
    async create({ name, cpf }: ICreateCredorDTO): Promise<Credor> {
        const credor = this.ormRepository.create();
        Object.assign(credor, { name, cpf, status: "created" });
        await this.ormRepository.save(credor);
        return credor;
    }
    findByCpf(cpf: string): Promise<Credor> {
        console.log(cpf);
        throw new Error("Method not implemented.");
    }
}
