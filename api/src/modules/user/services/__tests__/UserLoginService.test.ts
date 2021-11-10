import "reflect-metadata";

import { hashSync } from "bcryptjs";
import { container, injectable } from "tsyringe";

import { IUserRepository, ICreateUserDTO, User } from "../..";
import { UserLoginService } from "../UserLoginService";

const date = new Date();
const testUser = {
    id: "valid_uuid",
    name: "nome",
    email: "email@test.com",
    password: hashSync("123", 10),
    created_at: date,
    updated_at: date,
};

const duplicated_email = "email@duplicated.com";
@injectable()
class StubRepository implements IUserRepository {
    find(id: string): Promise<User> {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User> {
        if (email === duplicated_email) {
            const user = await new User();
            return user;
        }
        if (email === "email@test.com") {
            return testUser;
        }
        return undefined;
    }
    list(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    async create({ name, email, password }: ICreateUserDTO): Promise<User> {
        const user = await {
            id: "valid_uuid",
            email,
            password: `${password}_hash`,
            name,
            updated_at: date,
            created_at: date,
        };
        return user;
    }
}

describe("UserLoginService tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const userLoginService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(UserLoginService);
        const spyService = jest.spyOn(userLoginService, "execute");
        userLoginService.execute({
            email: "email@test.com",
            password: "123",
        });
        expect(spyService).toBeCalledWith({
            email: "email@test.com",
            password: "123",
        });
    });
    test("Should return correct values", async () => {
        const userLoginService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(UserLoginService);
        const token = await userLoginService.execute({
            email: "email@test.com",
            password: "123",
        });
        expect(token.user.name).toEqual("nome");
    });
    test("Should not login if a user password is wrong", () => {
        const userLoginService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(UserLoginService);

        expect(
            userLoginService.execute({
                email: "email@test.com",
                password: "invalid_password",
            })
        ).rejects.toEqual({ message: "Invalid credentials!", statusCode: 401 });
    });
    test("Should throw if a email is invalid", async () => {
        const userLoginService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(UserLoginService);

        expect(
            userLoginService.execute({
                email: "invalid_email",
                password: "valid_password",
            })
        ).rejects.toEqual({ message: "Invalid credentials!", statusCode: 401 });
    });
});
