import { Request, Response } from "express";
import { container } from "tsyringe";

import { UserLoginService } from "../services/UserLoginService";

export class UserLoginController {
    async handle(request: Request, response: Response): Promise<Response> {
        const userLoginService = container.resolve(UserLoginService);

        const { email, password } = request.body;

        const user = await userLoginService.execute({ email, password });

        return response.status(200).json(user);
    }
}
