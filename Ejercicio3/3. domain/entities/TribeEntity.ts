import { Entity, Column, OneToOne, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { Organization } from "./OrganizationEntity";
import { Repository } from "./RepositoryEntity";

@Entity({ name: "tribe"})
export class Tribe {
    @Column({ type: "int", primary: true })
    id_tribe: number | undefined;
    @Column({ type: "int" })
    id_organization: number | undefined;
    @Column({type: "char"})
    name: string | undefined;
    @Column({type: "int"})
    status: number | undefined;
    @ManyToOne(() => Organization, Organization => Organization.tribes)
    @JoinColumn({ name: 'id_organization' })
    organization: Organization | undefined;

    @OneToMany(() => Repository, repository => repository.tribes)
    @JoinColumn({ name: 'id_repository' })
    repositorys: Repository[] | undefined;
}