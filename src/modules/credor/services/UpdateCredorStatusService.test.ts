import "reflect-metadata";
import { container } from "tsyringe";

import { ICredorRepository } from "..";

import {
    date,
    duplicated_cpf,
    StubCredorRepository,
} from "../repositories/implementations/StubCredorRepository";
import { UpdateCredorStatusService } from "./UpdateCredorStatusService";

const updateCredorStatusService = container
    .createChildContainer()
    .register<ICredorRepository>("CredorRepository", StubCredorRepository)
    .resolve(UpdateCredorStatusService);

describe("UpdateCredorStatusService tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const spyService = jest.spyOn(updateCredorStatusService, "execute");
        updateCredorStatusService.execute({
            approval: true,
            cpf: duplicated_cpf,
        });
        expect(spyService).toBeCalledWith({
            approval: true,
            cpf: duplicated_cpf,
        });
    });
    test("Should throw if a cpf is invalid", () => {
        const spyService = jest.spyOn(updateCredorStatusService, "execute");
        updateCredorStatusService.execute({
            approval: true,
            cpf: "123.456.789-80",
        });
        expect(spyService).toThrow();
    });
    test("Should return correct values if credor is approved", async () => {
        const credor = await updateCredorStatusService.execute({
            approval: true,
            cpf: duplicated_cpf,
        });
        console.log(credor);
        expect(credor).toEqual({
            id: "valid_uuid",
            name: "credor_name",
            cpf: duplicated_cpf,
            status: "Approved",
            created_at: date,
            updated_at: date,
        });
    });
    test("Should return correct values if credor is rejected", async () => {
        const credor = await updateCredorStatusService.execute({
            approval: false,
            cpf: duplicated_cpf,
        });
        expect(credor).toEqual({
            id: "valid_uuid",
            name: "credor_name",
            cpf: duplicated_cpf,
            status: "Rejected",
            created_at: date,
            updated_at: date,
        });
    });
});
