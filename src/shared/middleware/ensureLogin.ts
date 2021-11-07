import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import { UserRepository } from "../../modules/user";
import { AppError } from "../errors/AppError";

interface IPayload {
    sub: string;
}

export async function ensureLogin(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void | NextFunction> {
    const authHeader = request.headers.authorization;
    if (!authHeader) throw new AppError("Token missing");
    const [, token] = authHeader.split(" ");
    try {
        const { sub } = verify(token, process.env.SECRET) as IPayload;
        const userRepository = new UserRepository();
        const user = await userRepository.find(sub);
        if (!user) throw new AppError("Users does not exists");
        request.user = {
            id: user.id,
        };
        return next();
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }
}
