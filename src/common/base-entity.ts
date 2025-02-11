import { PrimaryColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryColumn({ type: "uuid" })
    id: string;
}