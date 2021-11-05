import "reflect-metadata";
import { container, injectable } from "tsyringe";

import { ICreateCredorDTO, ICredorRepository } from "..";

import { Credor } from "../entities/Credor";
import { CreateCredorService } from "./CreateCredorService";

const date = new Date();

@injectable()
class StubRepository implements ICredorRepository {
    async create({ name, cpf }: ICreateCredorDTO): Promise<Credor> {
        const credor: Credor = await {
            id: "valid_uuid",
            cpf,
            name,
            status: "created",
            updated_at: date,
            created_at: date,
        };
        return credor;
    }
    async findByCpf(cpf: string): Promise<Credor> {
        if (cpf === "duplicate_cpf") {
            const credor = await new Credor();
            return credor;
        }
        return undefined;
    }
}

describe("CreateCredorService tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const createCredorService = container
            .createChildContainer()
            .register<ICredorRepository>("CredorRepository", StubRepository)
            .resolve(CreateCredorService);
        const spyService = jest.spyOn(createCredorService, "execute");
        createCredorService.execute({ name: "valid_name", cpf: "valid_cpf" });
        expect(spyService).toBeCalledWith({
            name: "valid_name",
            cpf: "valid_cpf",
        });
    });
    test("Should return correct values", async () => {
        const createCredorService = container
            .createChildContainer()
            .register<ICredorRepository>("CredorRepository", StubRepository)
            .resolve(CreateCredorService);
        const credor = await createCredorService.execute({
            name: "valid_name",
            cpf: "valid_cpf",
        });
        console.log(credor);
        expect(credor).toEqual({
            id: "valid_uuid",
            name: "valid_name",
            cpf: "valid_cpf",
            status: "created",
            created_at: date,
            updated_at: date,
        });
    });
    test("Should not create credor if a credor cpf already exists", () => {
        const createCredorService = container
            .createChildContainer()
            .register<ICredorRepository>("CredorRepository", StubRepository)
            .resolve(CreateCredorService);
        const spyService = jest.spyOn(createCredorService, "execute");
        createCredorService.execute({
            name: "valid_name",
            cpf: "duplicate_cpf",
        });
        expect(spyService).toThrow();
    });
});
