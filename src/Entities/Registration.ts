import { Column, Entity, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryGeneratedColumn }from 'typeorm'


@Entity('Registration')
export class Registration extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    id_Students: number

    @Column()
    id_Subjects: number

    @CreateDateColumn()
    Date: Date
}