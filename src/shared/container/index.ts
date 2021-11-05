import { container } from "tsyringe";

import { ICredorRepository, CredorRepository } from "../../modules/credor";
import {
    EnteDevedorRepository,
    IEnteDevedorRepository,
} from "../../modules/enteDevedor";

container.registerSingleton<ICredorRepository>(
    "CredorRepository",
    CredorRepository
);
container.registerSingleton<IEnteDevedorRepository>(
    "EnteDevedorRepository",
    EnteDevedorRepository
);
