import "reflect-metadata";
import { cnpj as cnpjValidator } from "cpf-cnpj-validator";
import { container, injectable } from "tsyringe";

import { IEnteDevedorRepository, ICreateEnteDevedorDTO, EnteDevedor } from "..";

import { CreateEnteDevedorService } from "./CreateEnteDevedorService";

const date = new Date();
const valid_cnpj = cnpjValidator.generate();
const duplicated_cnpj = "13.161.111/0001-21";
@injectable()
class StubRepository implements IEnteDevedorRepository {
    find(id: string): Promise<EnteDevedor> {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    async findByCnpj(cnpj: string): Promise<EnteDevedor> {
        if (cnpj === duplicated_cnpj) {
            const ente_devedor = await new EnteDevedor();
            return ente_devedor;
        }
        return undefined;
    }
    list(): Promise<EnteDevedor[]> {
        throw new Error("Method not implemented.");
    }
    async create({ name, cnpj }: ICreateEnteDevedorDTO): Promise<EnteDevedor> {
        const enteDevedor = await {
            id: "valid_uuid",
            cnpj,
            name,
            updated_at: date,
            created_at: date,
        };
        return enteDevedor;
    }
}

describe("CreateEnteDevedor tests", () => {
    beforeEach(() => {
        container.clearInstances();
    });
    test("Should call execute function with correct params", () => {
        const createEnteDevedorService = container
            .createChildContainer()
            .register<IEnteDevedorRepository>(
                "EnteDevedorRepository",
                StubRepository
            )
            .resolve(CreateEnteDevedorService);
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
        const createEnteDevedorService = container
            .createChildContainer()
            .register<IEnteDevedorRepository>(
                "EnteDevedorRepository",
                StubRepository
            )
            .resolve(CreateEnteDevedorService);
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
        const createEnteDevedorService = container
            .createChildContainer()
            .register<IEnteDevedorRepository>(
                "EnteDevedorRepository",
                StubRepository
            )
            .resolve(CreateEnteDevedorService);
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
        const createEnteDevedorService = container
            .createChildContainer()
            .register<IEnteDevedorRepository>(
                "EnteDevedorRepository",
                StubRepository
            )
            .resolve(CreateEnteDevedorService);
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
