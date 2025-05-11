/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTransactionDto } from '../models/CreateTransactionDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static transactionsControllerGetMyCreditBalance(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/me/credit-balance',
        });
    }
    /**
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public static transactionsControllerGetCreditBalance(
        userId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/{userId}/credit-balance',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static transactionsControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static transactionsControllerCreate(
        requestBody: CreateTransactionDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static transactionsControllerFindMy(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/me',
        });
    }
    /**
     * @param userId
     * @returns any
     * @throws ApiError
     */
    public static transactionsControllerFindByUserId(
        userId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
