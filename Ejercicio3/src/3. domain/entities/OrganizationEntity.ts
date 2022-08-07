import { Entity, Column, OneToOne, OneToMany, JoinColumn } from "typeorm";
import { Tribe } from "./TribeEntity";

@Entity({ name: "organization"})
export class Organization {
    @Column({ type: "int", primary: true })
    id_organization: number | undefined;
    @Column({type: "char"})
    name: string | undefined;
    @Column({type: "int"})
    status: number | undefined;

    @OneToMany(() => Tribe, tribe => tribe.organization)
    @JoinColumn({ name: 'id_tribe' })
    tribes: Tribe[] | undefined;
}