/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UploadFileResponseDto } from '../models/UploadFileResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FilesService {
    /**
     * Upload a file
     * @param formData
     * @returns UploadFileResponseDto
     * @throws ApiError
     */
    public static fileControllerUploadFile(
        formData: {
            /**
             * The file to upload
             */
            file: Blob;
        },
    ): CancelablePromise<UploadFileResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/files/upload',
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
}
