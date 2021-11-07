import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { User } from "../../entities/User";

export interface IUserRepository {
    create({ name, email, password }: ICreateUserDTO): Promise<User>;
    find(id: string): Promise<User>;
    findByEmail(email: string): Promise<User>;
    list(): Promise<User[]>;
}
