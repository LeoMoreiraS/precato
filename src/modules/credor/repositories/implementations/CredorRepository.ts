import { getRepository, Repository } from "typeorm";

import { ICreateCredorDTO } from "../../DTOs/ICreateCredorDTO";
import { IUpdateStatusCredorDTO } from "../../DTOs/IUpdateStatusCredorDTO";
import { Credor } from "../../entities/Credor";
import { ICredorRepository } from "../interfaces/ICredorRepository";

export class CredorRepository implements ICredorRepository {
    private ormRepository: Repository<Credor>;
    constructor() {
        this.ormRepository = getRepository(Credor);
    }
    async list(): Promise<Credor[]> {
        const credores = await this.ormRepository.find();
        return credores;
    }
    async updateStatus({
        status,
        cpf,
    }: IUpdateStatusCredorDTO): Promise<Credor> {
        const credor = await this.findByCpf(cpf);
        Object.assign(credor, { status });
        await this.ormRepository.save(credor);
        return credor;
    }
    async create({ name, cpf }: ICreateCredorDTO): Promise<Credor> {
        const credor = this.ormRepository.create();
        Object.assign(credor, { name, cpf, status: "created" });
        await this.ormRepository.save(credor);
        return credor;
    }
    async findByCpf(cpf: string): Promise<Credor> {
        const credor = await this.ormRepository.findOne({ cpf });
        return credor;
    }
}
