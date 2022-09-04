export interface Customer {
    readonly id: number;
    readonly firstName: string;
    readonly secondName: string;
    readonly lastName?: string;
    readonly email?: string;
    readonly phone?: string;
    readonly birthday?: Date;
}
