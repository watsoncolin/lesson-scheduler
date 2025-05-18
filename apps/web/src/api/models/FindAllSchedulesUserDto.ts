/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type FindAllSchedulesUserDto = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: FindAllSchedulesUserDto.role;
};
export namespace FindAllSchedulesUserDto {
    export enum role {
        USER = 'user',
        ADMIN = 'admin',
        INSTRUCTOR = 'instructor',
    }
}

