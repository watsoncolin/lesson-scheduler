/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type SearchScheduleUserDto = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: SearchScheduleUserDto.role;
};
export namespace SearchScheduleUserDto {
    export enum role {
        USER = 'user',
        ADMIN = 'admin',
        INSTRUCTOR = 'instructor',
    }
}

