import "reflect-metadata";
import { cpf as cpfValidator } from "cpf-cnpj-validator";
import { container, injectable } from "tsyringe";

import { ICreateCredorDTO, ICredorRepository } from "..";

import { IUpdateStatusCredorDTO } from "../DTOs/IUpdateStatusCredorDTO";
import { Credor } from "../entities/Credor";
import { UpdateCredorStatusService } from "./UpdateCredorStatusService";

const date = new Date();
const valid_cpf = cpfValidator.generate();

@injectable()
class StubRepository implements ICredorRepository {
    find(id: string): Promise<Credor> {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    list(): Promise<Credor[]> {
        throw new Error("Method not implemented.");
    }
    async updateStatus({
        status,
        cpf,
    }: IUpdateStatusCredorDTO): Promise<Credor> {
        const credor: Credor = await {
            id: "valid_uuid",
            cpf,
            name: "credor_name",
            status,
            updated_at: date,
            created_at: date,
        };
        return credor;
    }
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
        if (cpf === valid_cpf) {
            const credor = await new Credor();
            return credor;
        }
        return undefined;
    }
}

describe("UpdateCredorStatusService tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const updateCredorStatusService = container
            .createChildContainer()
            .register<ICredorRepository>("CredorRepository", StubRepository)
            .resolve(UpdateCredorStatusService);
        const spyService = jest.spyOn(updateCredorStatusService, "execute");
        updateCredorStatusService.execute({ approval: true, cpf: valid_cpf });
        expect(spyService).toBeCalledWith({
            approval: true,
            cpf: valid_cpf,
        });
    });
    test("Should throw if a cpf is invalid", () => {
        const updateCredorStatusService = container
            .createChildContainer()
            .register<ICredorRepository>("CredorRepository", StubRepository)
            .resolve(UpdateCredorStatusService);
        const spyService = jest.spyOn(updateCredorStatusService, "execute");
        updateCredorStatusService.execute({
            approval: true,
            cpf: "123.456.789-80",
        });
        expect(spyService).toThrow();
    });
    test("Should return correct values if credor is approved", async () => {
        const updateCredorStatusService = container
            .createChildContainer()
            .register<ICredorRepository>("CredorRepository", StubRepository)
            .resolve(UpdateCredorStatusService);
        const credor = await updateCredorStatusService.execute({
            approval: true,
            cpf: valid_cpf,
        });
        console.log(credor);
        expect(credor).toEqual({
            id: "valid_uuid",
            name: "credor_name",
            cpf: valid_cpf,
            status: "Approved",
            created_at: date,
            updated_at: date,
        });
    });
    test("Should return correct values if credor is rejected", async () => {
        const updateCredorStatusService = container
            .createChildContainer()
            .register<ICredorRepository>("CredorRepository", StubRepository)
            .resolve(UpdateCredorStatusService);
        const credor = await updateCredorStatusService.execute({
            approval: false,
            cpf: valid_cpf,
        });
        console.log(credor);
        expect(credor).toEqual({
            id: "valid_uuid",
            name: "credor_name",
            cpf: valid_cpf,
            status: "Rejected",
            created_at: date,
            updated_at: date,
        });
    });
});
