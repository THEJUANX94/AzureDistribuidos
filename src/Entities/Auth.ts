import { Column, Entity, BaseEntity, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm'
import bcrypt from "bcryptjs";
import { rol } from './Role';


@Entity('Authentication')
export class Authentication extends BaseEntity {

    @PrimaryColumn()
    Mail: string

    @Column()
    Password: string

    @OneToMany(() => rol, (rol) => rol.id)
    Roles: rol["id"][]


    public encryptPassword = async (password: string): Promise<string> => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    };

    public validatePassword = async (password: string): Promise<boolean> => {
        return await bcrypt.compare(password, this.Password);
    }

}