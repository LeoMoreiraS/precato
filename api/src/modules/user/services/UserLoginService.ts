import { compare } from "bcryptjs";
import { validate as emailValidator } from "email-validator";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../shared/errors/AppError";
import { IUserRepository } from "../repositories/interfaces/IUserRepository";

interface IRequest {
    email: string;
    password: string;
}
interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}
@injectable()
export class UserLoginService {
    constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const emailIsValid = emailValidator(email);
        if (!emailIsValid) {
            throw new AppError("Invalid credentials!", 401);
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Invalid credentials!", 401);
        }

        const passwordCorrect = await compare(password, user.password);
        if (!passwordCorrect) {
            throw new AppError("Invalid credentials!", 401);
        }

        const token = sign({}, process.env.SECRET || "123", {
            subject: user.id,
            expiresIn: "1d",
        });
        return { user: { name: user.name, email: user.email }, token };
    }
}
