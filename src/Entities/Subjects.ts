import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm'


@Entity('Subjects')
export class Subject extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    SubjectCode: string

    @Column()
    Name: String

    @Column()
    Credits: number

    @Column()
    Slots: number

    @Column()
    state: boolean
}