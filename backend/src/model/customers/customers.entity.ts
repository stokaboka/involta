import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Customers')
export class CustomersEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        name: 'nickname',
        type: 'varchar',
        length: 255,
        unique: true,
    })
    public login: string;

    @Column({
        name: 'firstName',
        type: 'varchar',
        nullable: true,
        default: '',
        length: 255,
    })
    public firstName: string;

    @Column({
        name: 'secondName',
        type: 'varchar',
        nullable: true,
        default: '',
        length: 255,
    })
    public secondName: string;

    @Column({
        name: 'lastName',
        type: 'varchar',
        nullable: true,
        default: '',
        length: 255,
    })
    public lastName: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: 255,
        nullable: true,
        default: '',
    })
    public email: string;

    @Column({
        name: 'phone',
        type: 'varchar',
        length: 45,
        nullable: true,
        default: '',
    })
    public phone: string;

    @Column({
        name: 'birthday',
        type: 'timestamp',
        default: null,
    })
    public birthday: Date;
}
