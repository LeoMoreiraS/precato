import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { User } from "../entities/User";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";

@injectable()
export class ListUsersService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute(): Promise<User[]> {
        const users = await this.userRepository.list();
        if (users.length === 0) throw new AppError("No user was found!");
        return users;
    }
}
