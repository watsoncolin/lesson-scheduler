/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UpdateUserDto } from '../models/UpdateUserDto';
import type { WaiverDto } from '../models/WaiverDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MeService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static meControllerFindMe(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static meControllerUpdate(
        requestBody: UpdateUserDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/me',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static meControllerRemove(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/me',
        });
    }
    /**
     * Update the user waiver
     * Updates the waiver information for the current user.
     * @param requestBody
     * @returns any Waiver updated successfully.
     * @throws ApiError
     */
    public static meControllerUpdateWaiver(
        requestBody: WaiverDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/me/waiver',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
