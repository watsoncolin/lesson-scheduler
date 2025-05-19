/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ScheduleUserDto = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: ScheduleUserDto.role;
};
export namespace ScheduleUserDto {
    export enum role {
        USER = 'user',
        ADMIN = 'admin',
        INSTRUCTOR = 'instructor',
    }
}

