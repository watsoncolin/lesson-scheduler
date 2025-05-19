/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ParentTotScheduleResponseDto = {
    /**
     * Schedule ID
     */
    id: string;
    /**
     * Pool ID
     */
    poolId: string;
    /**
     * Instructor ID
     */
    instructorId: string;
    /**
     * Class size
     */
    classSize: number;
    /**
     * Type of lesson
     */
    lessonType: ParentTotScheduleResponseDto.lessonType;
    /**
     * Start date and time
     */
    startDateTime: string;
    /**
     * End date and time
     */
    endDateTime: string;
    /**
     * Number of spots available
     */
    spotsAvailable: number;
};
export namespace ParentTotScheduleResponseDto {
    /**
     * Type of lesson
     */
    export enum lessonType {
        PRIVATE = 'private',
        GROUP = 'group',
    }
}

