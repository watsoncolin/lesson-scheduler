/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoogleTokenDto } from '../models/GoogleTokenDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GoogleAuthenticationService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static googleAuthenticationControllerAuthenticate(
        requestBody: GoogleTokenDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/google',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
