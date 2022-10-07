import { Column, Entity, CreateDateColumn, UpdateDateColumn, BaseEntity }from 'typeorm'


@Entity('Registration')
export class Registration extends BaseEntity{

    @Column()
    id_Students: number

    @Column()
    id_Subjects: number

    @CreateDateColumn()
    Date: Date
}