import "reflect-metadata";

import { container } from "tsyringe";

import { IEnteDevedorRepository } from "..";

import {
    StubEnteDevedorRepository,
    valid_cnpj,
    date,
    duplicated_cnpj,
} from "../repositories/implementations/StubEnteDevedorRepository";
import { CreateEnteDevedorService } from "./CreateEnteDevedorService";

const createEnteDevedorService = container
    .createChildContainer()
    .register<IEnteDevedorRepository>(
        "EnteDevedorRepository",
        StubEnteDevedorRepository
    )
    .resolve(CreateEnteDevedorService);

describe("CreateEnteDevedor tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const spyService = jest.spyOn(createEnteDevedorService, "execute");
        createEnteDevedorService.execute({
            name: "valid_name",
            cnpj: valid_cnpj,
        });
        expect(spyService).toBeCalledWith({
            name: "valid_name",
            cnpj: valid_cnpj,
        });
    });
    test("Should throw if a cnpj is invalid", async () => {
        const spyService = jest.spyOn(createEnteDevedorService, "execute");
        try {
            createEnteDevedorService.execute({
                name: "valid_name",
                cnpj: "12.345.11/0001-21",
            });
        } catch (e) {
            expect(spyService).toThrow();
            expect(e.message).toEqual("Invalid cnpj number!");
        }
    });
    test("Should return correct values", async () => {
        const enteDevedor = await createEnteDevedorService.execute({
            name: "valid_name",
            cnpj: valid_cnpj,
        });
        expect(enteDevedor).toEqual({
            id: "valid_uuid",
            name: "valid_name",
            cnpj: valid_cnpj,
            created_at: date,
            updated_at: date,
        });
    });
    test("Should not create a EnteDevedor if EnteDevedor cnpj already exists", () => {
        const spyService = jest.spyOn(createEnteDevedorService, "execute");
        try {
            createEnteDevedorService.execute({
                name: "valid_name",
                cnpj: duplicated_cnpj,
            });
        } catch (e) {
            expect(spyService).toThrow();
        }
    });
});
