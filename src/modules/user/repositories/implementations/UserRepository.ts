import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../DTOs/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";

export class UserRepository implements IUserRepository {
    private ormRepository: Repository<User>;
    constructor() {
        this.ormRepository = getRepository(User);
    }
    async find(id: string): Promise<User> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    async list(): Promise<User[]> {
        const credores = await this.ormRepository.find();
        return credores;
    }
    async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create();
        Object.assign(user, { name, email, password });
        await this.ormRepository.save(user);
        return user;
    }
}
