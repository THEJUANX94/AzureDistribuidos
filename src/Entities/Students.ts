import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn, BaseEntity } from 'typeorm'


@Entity('Students')
export class Students extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Document: String

    @Column()
    DocumentType: String

    @Column()
    FirstName: String

    @Column()
    LastName: String

    @Column()
    imagePath: String 

    @Column()
    state: boolean
}