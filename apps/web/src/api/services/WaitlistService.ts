/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WaitlistService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static waitlistControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/waitlist',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static waitlistControllerMe(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/waitlist/me',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static waitlistControllerJoin(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/waitlist/join',
        });
    }
    /**
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public static waitlistControllerUpdate(
        userId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/waitlist/{userId}/allow-purchase',
            path: {
                'userId': userId,
            },
        });
    }
}
