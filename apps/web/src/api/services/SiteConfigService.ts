/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SiteConfigResponseDto } from '../models/SiteConfigResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SiteConfigService {
    /**
     * Toggle the waitlist status
     * @returns SiteConfigResponseDto The updated site config
     * @throws ApiError
     */
    public static siteConfigControllerToggleWaitlist(): CancelablePromise<SiteConfigResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/config/waitlist',
        });
    }
    /**
     * Get the current site config
     * @returns SiteConfigResponseDto The current site config
     * @throws ApiError
     */
    public static siteConfigControllerFindOne(): CancelablePromise<SiteConfigResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/config',
        });
    }
}
