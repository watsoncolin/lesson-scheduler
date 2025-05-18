/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WaitlistResponseDto } from '../models/WaitlistResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class WaitlistService {
    /**
     * Get all waitlist entries
     * @returns WaitlistResponseDto
     * @throws ApiError
     */
    public static waitlistControllerFindAll(): CancelablePromise<Array<WaitlistResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/waitlist',
        });
    }
    /**
     * Get waitlist entry for current user
     * @returns WaitlistResponseDto
     * @throws ApiError
     */
    public static waitlistControllerMe(): CancelablePromise<WaitlistResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/waitlist/me',
        });
    }
    /**
     * Join the waitlist as the current user
     * @returns WaitlistResponseDto
     * @throws ApiError
     */
    public static waitlistControllerJoin(): CancelablePromise<WaitlistResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/waitlist/join',
        });
    }
    /**
     * Allow a user to purchase from the waitlist
     * @param userId
     * @returns WaitlistResponseDto
     * @throws ApiError
     */
    public static waitlistControllerUpdate(
        userId: string,
    ): CancelablePromise<WaitlistResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/waitlist/{userId}/allow-purchase',
            path: {
                'userId': userId,
            },
        });
    }
}
