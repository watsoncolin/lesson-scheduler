/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePoolDto } from '../models/CreatePoolDto';
import type { PoolDto } from '../models/PoolDto';
import type { UpdatePoolDto } from '../models/UpdatePoolDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PoolsService {
    /**
     * Get all pools
     * @returns PoolDto List of pools
     * @throws ApiError
     */
    public static poolControllerFindAll(): CancelablePromise<Array<PoolDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/pools',
        });
    }
    /**
     * Create a new pool
     * @param requestBody
     * @returns PoolDto Pool created
     * @throws ApiError
     */
    public static poolControllerCreate(
        requestBody: CreatePoolDto,
    ): CancelablePromise<PoolDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/pools',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a pool by ID
     * @param id
     * @returns PoolDto Pool found
     * @throws ApiError
     */
    public static poolControllerFindOne(
        id: string,
    ): CancelablePromise<PoolDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/pools/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Pool not found`,
            },
        });
    }
    /**
     * Update a pool by ID
     * @param id
     * @param requestBody
     * @returns PoolDto Pool updated
     * @throws ApiError
     */
    public static poolControllerUpdate(
        id: string,
        requestBody: UpdatePoolDto,
    ): CancelablePromise<PoolDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/pools/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Pool not found`,
            },
        });
    }
    /**
     * Delete a pool by ID
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static poolControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/pools/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Pool not found`,
            },
        });
    }
}
