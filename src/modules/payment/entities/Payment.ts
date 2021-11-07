import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    Double,
} from "typeorm";
import { v4 as uuid } from "uuid";

import { Credor } from "../../credor/entities/Credor";
import { EnteDevedor } from "../../enteDevedor/entities/EnteDevedor";

@Entity("payments")
export class Payment {
    @PrimaryColumn()
    id?: string;

    @Column()
    credor_id: string;

    @JoinColumn({ name: "credor_id" })
    @ManyToOne(() => Credor)
    credor: Credor;

    @Column()
    ente_devedor_id: string;

    @JoinColumn({ name: "ente_devedor_id" })
    @ManyToOne(() => EnteDevedor)
    enteDevedor: EnteDevedor;

    @Column()
    status: string;

    @Column()
    reason: string;

    @Column({ type: "float" })
    start_value: Double;

    @Column({ type: "float" })
    end_value: Double;

    @Column()
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
