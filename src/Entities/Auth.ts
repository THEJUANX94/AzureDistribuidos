import { Column, Entity, BaseEntity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import bcrypt from "bcryptjs";


@Entity('Authentication')
export class Authentication extends BaseEntity {

    @PrimaryColumn({ unique: true })
    Mail: string

    @Column()
    Password: string

    public encryptPassword = async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    public validatePassword = async (password: string): Promise<boolean> => {
        return await bcrypt.compare(password, this.Password);
    }

}