import { getRepository, Repository } from "typeorm";

import { ICreateEnteDevedorDTO } from "../../DTOs/ICreateEnteDevedorDTO";
import { EnteDevedor } from "../../entities/EnteDevedor";
import { IEnteDevedorRepository } from "../interfaces/IEnteDevedorRepository";

export class EnteDevedorRepository implements IEnteDevedorRepository {
    private ormRepository: Repository<EnteDevedor>;
    constructor() {
        this.ormRepository = getRepository(EnteDevedor);
    }
    async findByCnpj(cnpj: string): Promise<EnteDevedor> {
        const enteDevedor = await this.ormRepository.findOne({ cnpj });
        return enteDevedor;
    }
    async list(): Promise<EnteDevedor[]> {
        const entesDevedores = await this.ormRepository.find();
        return entesDevedores;
    }
    async create({ name, cnpj }: ICreateEnteDevedorDTO): Promise<EnteDevedor> {
        const enteDevedor = this.ormRepository.create();
        Object.assign(enteDevedor, { name, cnpj });
        await this.ormRepository.save(enteDevedor);
        return enteDevedor;
    }
}
