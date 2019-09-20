export enum Role {
    USER,
    ADMIN
}

export enum LoginMode {
    EMAIL,
    PASSWORD,
    NAME
}

export interface UserDetails {
    Name: string;
    Email: string;
}
