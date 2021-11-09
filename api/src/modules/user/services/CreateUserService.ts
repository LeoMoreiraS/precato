import { hash } from "bcryptjs";
import { validate as emailValidator } from "email-validator";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "..";

import { AppError } from "../../../shared/errors/AppError";
import { User } from "../entities/User";

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
export class CreateUserService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}
    async execute({ name, email, password }: IRequest): Promise<User> {
        const emailIsValid = emailValidator(email);
        if (!emailIsValid) {
            throw new AppError("Invalid email address!");
        }

        const emailAlreadyExists = await this.userRepository.findByEmail(email);
        if (emailAlreadyExists) {
            throw new AppError("Email already exists!");
        }

        const password_hash = await hash(password, 10);
        return this.userRepository.create({
            name,
            email,
            password: password_hash,
        });
    }
}
