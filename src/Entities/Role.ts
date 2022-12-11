import { Column, Entity, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm'
import { Authentication } from './Auth'


@Entity('rol')
export class rol extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: String

    @OneToMany(() => Authentication, (auth) => auth.Roles)
    auth: Authentication[]
}