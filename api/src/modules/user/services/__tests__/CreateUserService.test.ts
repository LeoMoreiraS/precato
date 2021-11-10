import "reflect-metadata";

import { container, injectable } from "tsyringe";

import { IUserRepository, ICreateUserDTO, User } from "../..";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateUserService } from "../CreateUserService";

const date = new Date();

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

describe("CreateUserService tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const createUserService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(CreateUserService);
        const spyService = jest.spyOn(createUserService, "execute");
        createUserService.execute({
            name: "valid_name",
            email: "email@email.com",
            password: "valid_password",
        });
        expect(spyService).toBeCalledWith({
            name: "valid_name",
            email: "email@email.com",
            password: "valid_password",
        });
    });
    test("Should return correct values", async () => {
        const createUserService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(CreateUserService);
        const password = "valid_password";
        const email = "validemail@gmail.com";
        const name = "valid_name";
        const enteDevedor = await createUserService.execute({
            name,
            email,
            password,
        });
        expect(enteDevedor.id).toEqual("valid_uuid");
        expect(enteDevedor.password).toBeTruthy();
    });
    test("Should not create a user if email already exists", () => {
        const createUserService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(CreateUserService);

        expect(
            createUserService.execute({
                name: "valid_name",
                email: duplicated_email,
                password: "valid_password",
            })
        ).rejects.toEqual(new AppError("Email already exists!"));
    });
    test("Should throw if a email is invalid", async () => {
        const createUserService = container
            .createChildContainer()
            .register<IUserRepository>("UserRepository", StubRepository)
            .resolve(CreateUserService);

        expect(
            createUserService.execute({
                name: "valid_name",
                email: "invalid_email",
                password: "valid_password",
            })
        ).rejects.toEqual(new AppError("Invalid email address!"));
    });
});
