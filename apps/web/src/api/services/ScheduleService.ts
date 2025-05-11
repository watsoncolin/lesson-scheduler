/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateScheduleDto } from '../models/CreateScheduleDto';
import type { UpdateScheduleDto } from '../models/UpdateScheduleDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ScheduleService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerCreate(
        requestBody: CreateScheduleDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerFindAllParentTot(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/parent-tot',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerFindAllForLoggedInUser(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/me',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerSearch(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/search',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerFindAvailableDates(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/available-dates',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static scheduleControllerUpdate(
        id: string,
        requestBody: UpdateScheduleDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/schedules/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static scheduleControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/schedules/{id}',
            path: {
                'id': id,
            },
        });
    }
}
