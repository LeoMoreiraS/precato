import "reflect-metadata";

import { container } from "tsyringe";

import { ICredorRepository } from "..";

import {
    date,
    duplicated_cpf,
    StubCredorRepository,
    valid_cpf,
} from "../repositories/implementations/StubCredorRepository";
import { CreateCredorService } from "./CreateCredorService";

const createCredorService = container
    .createChildContainer()
    .register<ICredorRepository>("CredorRepository", StubCredorRepository)
    .resolve(CreateCredorService);

describe("CreateCredorService tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const spyService = jest.spyOn(createCredorService, "execute");
        createCredorService.execute({ name: "valid_name", cpf: valid_cpf });
        expect(spyService).toBeCalledWith({
            name: "valid_name",
            cpf: valid_cpf,
        });
    });
    test("Should throw if a cpf is invalid", () => {
        const spyService = jest.spyOn(createCredorService, "execute");
        createCredorService.execute({
            name: "valid_name",
            cpf: "123.456.789-80",
        });
        expect(spyService).toThrow();
    });
    test("Should return correct values", async () => {
        const credor = await createCredorService.execute({
            name: "valid_name",
            cpf: valid_cpf,
        });
        console.log(credor);
        expect(credor).toEqual({
            id: "valid_uuid",
            name: "valid_name",
            cpf: valid_cpf,
            status: "created",
            created_at: date,
            updated_at: date,
        });
    });
    test("Should not create credor if a credor cpf already exists", () => {
        const spyService = jest.spyOn(createCredorService, "execute");
        createCredorService.execute({
            name: "valid_name",
            cpf: duplicated_cpf,
        });
        expect(spyService).toThrow();
    });
});
