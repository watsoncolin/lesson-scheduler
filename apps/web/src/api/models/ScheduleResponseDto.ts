/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ScheduleRegistrationDto } from './ScheduleRegistrationDto';
export type ScheduleResponseDto = {
    id: string;
    poolId: string;
    instructorId: string;
    classSize: number;
    lessonType: ScheduleResponseDto.lessonType;
    startDateTime: string;
    endDateTime: string;
    registrations: Array<ScheduleRegistrationDto>;
};
export namespace ScheduleResponseDto {
    export enum lessonType {
        PRIVATE = 'private',
        GROUP = 'group',
    }
}

