import "reflect-metadata";

import { container } from "tsyringe";

import { IPaymentRepository } from "..";

import { ICredorRepository } from "../../credor";
import { StubCredorRepository } from "../../credor/repositories/implementations/StubCredorRepository";
import { IEnteDevedorRepository } from "../../enteDevedor";
import { StubEnteDevedorRepository } from "../../enteDevedor/repositories/implementations/StubEnteDevedorRepository";
import {
    StubPaymentRepository,
    valid_credor,
    valid_input,
} from "../repositories/implementations/StubPaymentRepository";
import { CreatePaymentService } from "./CreatePaymentService";

const createPaymentService = container
    .createChildContainer()
    .register<IPaymentRepository>("PaymentRepository", StubPaymentRepository)
    .createChildContainer()
    .register<ICredorRepository>("CredorRepository", StubCredorRepository)
    .createChildContainer()
    .register<IEnteDevedorRepository>(
        "EnteDevedorRepository",
        StubEnteDevedorRepository
    )
    .resolve(CreatePaymentService);

describe("CreateCredorService tests", () => {
    beforeEach(() => {
        console.log(valid_credor.id);
        container.clearInstances();
    });

    test("Should call execute function with correct params", () => {
        const spyService = jest.spyOn(createPaymentService, "execute");
        createPaymentService.execute(valid_input);
        console.log(valid_input);
        expect(spyService).toBeCalledWith(valid_input);
    });

    test("Should return a valid payment", async () => {
        const spyService = jest.spyOn(createPaymentService, "execute");
        const payment = await createPaymentService.execute(valid_input);
        expect(spyService).toThrow();
        console.log(payment);
        expect(payment.status).toBe("Valid");
    });

    test("Should return a invalid payment if any value less equal than zero", async () => {
        const spyService = jest.spyOn(createPaymentService, "execute");
        const invalid_input = valid_input;
        invalid_input.end_value = 0;
        const payment = await createPaymentService.execute(valid_input);
        expect(spyService).toThrow();

        expect(payment.status).toBe("Invalid");
        expect(payment.reason).toBe(
            "Start value or end value less equal than zero."
        );
    });

    test("Should return a invalid payment if end value is bigger than start value", async () => {
        const spyService = jest.spyOn(createPaymentService, "execute");
        const invalid_input = valid_input;
        invalid_input.end_value = 5000;
        const payment = await createPaymentService.execute(valid_input);
        expect(spyService).toThrow();

        expect(payment.status).toBe("Invalid");
        expect(payment.reason).toBe("End value is bigger than start value.");
    });

    test("Should return a invalid payment if credor status is rejected", async () => {
        const spyService = jest.spyOn(createPaymentService, "execute");
        const invalid_input = valid_input;
        invalid_input.credor_id = "invalid_credor_id";
        const payment = await createPaymentService.execute(valid_input);
        expect(spyService).toThrow();

        expect(payment.status).toBe("Invalid");
        expect(payment.reason).toBe("Credor status is not approved.");
    });

    test("Should return a invalid payment if ente devedor is missing", async () => {
        const spyService = jest.spyOn(createPaymentService, "execute");
        const invalid_input = valid_input;
        invalid_input.ente_devedor_id = "invalid_ente_id";
        const payment = await createPaymentService.execute(valid_input);
        expect(spyService).toThrow();

        expect(payment.status).toBe("Invalid");
        expect(payment.reason).toBe("Ente devedor does not exists.");
    });
});
