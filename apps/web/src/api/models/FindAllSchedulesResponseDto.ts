/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FindAllSchedulesRegistrationDto } from './FindAllSchedulesRegistrationDto';
export type FindAllSchedulesResponseDto = {
    id: string;
    poolId: string;
    instructorId: string;
    classSize: number;
    lessonType: FindAllSchedulesResponseDto.lessonType;
    startDateTime: string;
    endDateTime: string;
    registrations: Array<FindAllSchedulesRegistrationDto>;
};
export namespace FindAllSchedulesResponseDto {
    export enum lessonType {
        PRIVATE = 'private',
        GROUP = 'group',
    }
}

