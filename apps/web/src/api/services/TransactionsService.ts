/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTransactionDto } from '../models/CreateTransactionDto';
import type { CreditBalanceResponseDto } from '../models/CreditBalanceResponseDto';
import type { TransactionResponseDto } from '../models/TransactionResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TransactionsService {
    /**
     * @returns CreditBalanceResponseDto
     * @throws ApiError
     */
    public static transactionsControllerGetMyCreditBalance(): CancelablePromise<CreditBalanceResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/me/credit-balance',
        });
    }
    /**
     * @param userId
     * @returns CreditBalanceResponseDto
     * @throws ApiError
     */
    public static transactionsControllerGetCreditBalance(
        userId: string,
    ): CancelablePromise<CreditBalanceResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/{userId}/credit-balance',
            path: {
                'userId': userId,
            },
        });
    }
    /**
     * @returns TransactionResponseDto
     * @throws ApiError
     */
    public static transactionsControllerFindAll(): CancelablePromise<Array<TransactionResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions',
        });
    }
    /**
     * @param requestBody
     * @returns TransactionResponseDto
     * @throws ApiError
     */
    public static transactionsControllerCreate(
        requestBody: CreateTransactionDto,
    ): CancelablePromise<TransactionResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/transactions',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns TransactionResponseDto
     * @throws ApiError
     */
    public static transactionsControllerFindMy(): CancelablePromise<Array<TransactionResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/me',
        });
    }
    /**
     * @param userId
     * @returns TransactionResponseDto
     * @throws ApiError
     */
    public static transactionsControllerFindByUserId(
        userId: string,
    ): CancelablePromise<Array<TransactionResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/transactions/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
