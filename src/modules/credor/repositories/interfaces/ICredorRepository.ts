import { ICreateCredorDTO } from "../../DTOs/ICreateCredorDTO";
import { Credor } from "../../entities/Credor";

export interface ICredorRepository {
    create({ name, cpf }: ICreateCredorDTO): Promise<Credor>;
    findByCpf(cpf: string): Promise<Credor>;
}
