import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePaymentTable1636313979893 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: "payments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "credor_id",
                        type: "uuid",
                    },
                    {
                        name: "delivery_id",
                        type: "uuid",
                    },
                    {
                        name: "ente_devedor_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "start_value",
                        type: "varchar",
                    },
                    {
                        name: "end_value",
                        type: "float",
                    },
                    {
                        name: "date",
                        type: "timestamp",
                    },
                    {
                        name: "status",
                        type: "varchar",
                    },
                    {
                        name: "reason",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCredor",
                        referencedTableName: "credores",
                        referencedColumnNames: ["id"],
                        columnNames: ["credor_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "FKEnteDevedor",
                        referencedTableName: "entes_devedores",
                        referencedColumnNames: ["id"],
                        columnNames: ["ente_devedor_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("payments");
    }
}
