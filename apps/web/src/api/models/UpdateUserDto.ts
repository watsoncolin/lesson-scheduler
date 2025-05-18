/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateUserDto = {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    phone?: string;
    privateRegistration?: boolean;
    waiverSignature?: string;
    waiverSignatureDate?: string;
    instructorId?: string;
    role?: UpdateUserDto.role;
};
export namespace UpdateUserDto {
    export enum role {
        USER = 'user',
        ADMIN = 'admin',
        INSTRUCTOR = 'instructor',
    }
}

