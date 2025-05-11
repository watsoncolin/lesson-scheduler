/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRegistrationDto } from '../models/CreateRegistrationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RegistrationService {
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static registrationControllerCreate(
        id: string,
        requestBody: CreateRegistrationDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/schedules/{id}/registrations',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static registrationControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/schedules/{id}/registrations',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param studentId
     * @returns void
     * @throws ApiError
     */
    public static registrationControllerRemove(
        id: string,
        studentId: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/schedules/{id}/registrations/{studentId}',
            path: {
                'id': id,
                'studentId': studentId,
            },
        });
    }
}
