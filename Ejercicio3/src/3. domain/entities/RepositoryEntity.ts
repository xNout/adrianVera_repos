import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, Timestamp } from "typeorm";
import { Metrics } from "./MetricsEntity";
import { Tribe } from "./TribeEntity";

@Entity({ name: "repository"})
export class Repository {
    @Column({ type: "int", primary: true })
    id_repository: number | undefined;
    @Column({ type: "int" })
    id_tribe: number | undefined;
    @Column({type: "char"})
    name: string | undefined;
    @Column({type: "char"})
    state: string | undefined;
    @Column({type: "timestamp"})
    create_time: number  | undefined;
    @Column({type: "char"})
    status: string | undefined;
    @ManyToOne(() => Tribe, tribe => tribe.repositorys)
    @JoinColumn({ name: 'id_tribe' })
    tribes: Tribe | undefined;
    @OneToOne(() => Metrics, metrics => metrics.repository)
    metrics: Metrics | undefined;
}