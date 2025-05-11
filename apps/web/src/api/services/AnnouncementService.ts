/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateAnnouncementDto } from '../models/CreateAnnouncementDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AnnouncementService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static announcementControllerCreate(
        requestBody: CreateAnnouncementDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/announcement',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static announcementControllerFindOne(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/announcement',
        });
    }
}
