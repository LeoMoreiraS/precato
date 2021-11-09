import { inject, injectable } from "tsyringe";

import { User } from "../entities/User";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";

@injectable()
export class ListUsersService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute(): Promise<User[]> {
        return this.userRepository.list();
    }
}
