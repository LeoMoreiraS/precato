import "../index";
import { getConnection } from "typeorm";

beforeAll(() => {
    jest.useFakeTimers();
});
test("should match connection data", () => {
    const connection = getConnection();
    console.log(connection.options);
    expect(connection.options.database).toBe("db_test");
});
