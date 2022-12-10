import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm'
import { Authentication } from './Auth'


@Entity('rol')
export class rol extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @ManyToOne(() => Authentication, (auth) => auth)
    auth: Authentication
}