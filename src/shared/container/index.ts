import { container } from "tsyringe";

import { ICredorRepository, CredorRepository } from "../../modules/credor";

container.registerSingleton<ICredorRepository>(
    "CredorRepository",
    CredorRepository
);
