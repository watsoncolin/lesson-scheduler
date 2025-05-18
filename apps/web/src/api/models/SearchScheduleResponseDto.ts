/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SearchScheduleRegistrationDto } from './SearchScheduleRegistrationDto';
export type SearchScheduleResponseDto = {
    id: string;
    poolId: string;
    instructorId: string;
    classSize: number;
    lessonType: SearchScheduleResponseDto.lessonType;
    startDateTime: string;
    endDateTime: string;
    registrations: Array<SearchScheduleRegistrationDto>;
};
export namespace SearchScheduleResponseDto {
    export enum lessonType {
        PRIVATE = 'private',
        GROUP = 'group',
    }
}

