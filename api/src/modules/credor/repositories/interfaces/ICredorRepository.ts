import { ICreateCredorDTO } from "../../DTOs/ICreateCredorDTO";
import { IUpdateStatusCredorDTO } from "../../DTOs/IUpdateStatusCredorDTO";
import { Credor } from "../../entities/Credor";

export interface ICredorRepository {
    create({ name, cpf }: ICreateCredorDTO): Promise<Credor>;
    findByCpf(cpf: string): Promise<Credor>;
    find(id: string): Promise<Credor>;
    updateStatus({ status, cpf }: IUpdateStatusCredorDTO): Promise<Credor>;
    list(): Promise<Credor[]>;
}
