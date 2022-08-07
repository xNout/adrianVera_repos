import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Repository } from "./RepositoryEntity";

@Entity({ name: "metrics"})
export class Metrics {
    @Column({ type: "int", primary: true })
    id_repository: number | undefined;
    @Column({type: "float8"})
    coverage: number | undefined;
    @Column({type: "int"})
    bugs: number | undefined;
    @Column({type: "int"})
    vulnerabilities: number | undefined;
    @Column({type: "int"})
    hotspot: number | undefined;
    @Column({type: "int"})
    code_smells: number | undefined;
    @OneToOne(() => Repository, repository => repository.metrics)
    @JoinColumn({ name: 'id_repository' })
    repository: Repository | undefined;
}