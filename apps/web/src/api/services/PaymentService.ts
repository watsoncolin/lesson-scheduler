/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePaymentDto } from '../models/CreatePaymentDto';
import type { CreatePaypalOrderDto } from '../models/CreatePaypalOrderDto';
import type { UpdatePaymentDto } from '../models/UpdatePaymentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerCreate(
        requestBody: CreatePaymentDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerCreatePaypalOrder(
        requestBody: CreatePaypalOrderDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/paypal-create-order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static paymentControllerCaptureOrder(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/paypal-capture-order',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerAppleValidateMerchant(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/apple-validate-merchant',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerUpdate(
        id: string,
        requestBody: UpdatePaymentDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/payments/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
