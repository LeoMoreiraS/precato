import { ICreateEnteDevedorDTO } from "../..";
import { EnteDevedor } from "../../entities/EnteDevedor";

export interface IEnteDevedorRepository {
    create({ name, cnpj }: ICreateEnteDevedorDTO): Promise<EnteDevedor>;
    findByCnpj(cnpj: string): Promise<EnteDevedor>;
    find(id: string): Promise<EnteDevedor>;
    list(): Promise<EnteDevedor[]>;
}
