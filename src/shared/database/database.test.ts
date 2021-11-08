import "./index";

import { getConnection } from "typeorm";

test("should match connection data", () => {
    const connection = getConnection();
    console.log(connection.options);
    expect(connection.options.database).toBe("precato");
});
