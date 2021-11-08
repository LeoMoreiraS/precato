import { container } from "tsyringe";

import { ICredorRepository, CredorRepository } from "../../modules/credor";
import {
    EnteDevedorRepository,
    IEnteDevedorRepository,
} from "../../modules/enteDevedor";
import { PaymentRepository, IPaymentRepository } from "../../modules/payment";
import { IUserRepository, UserRepository } from "../../modules/user";

container.registerSingleton<ICredorRepository>(
    "CredorRepository",
    CredorRepository
);

container.registerSingleton<IEnteDevedorRepository>(
    "EnteDevedorRepository",
    EnteDevedorRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<IPaymentRepository>(
    "PaymentRepository",
    PaymentRepository
);
