import { Column, Entity, CreateDateColumn, UpdateDateColumn, BaseEntity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany }from 'typeorm'
import { Students } from './Students'
import { Subject } from './Subjects'

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

    @OneToOne(() => Students)
    @JoinColumn()
    student: Students

    @OneToMany(() => Subject, (subject) => subject.id)
    subjects: Subject[]
}