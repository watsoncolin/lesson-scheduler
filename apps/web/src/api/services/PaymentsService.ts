/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreatePaymentDto } from '../models/CreatePaymentDto';
import type { CreatePaypalOrderDto } from '../models/CreatePaypalOrderDto';
import type { PaymentResponseDto } from '../models/PaymentResponseDto';
import type { UpdatePaymentDto } from '../models/UpdatePaymentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PaymentsService {
    /**
     * Get all payments
     * @returns PaymentResponseDto
     * @throws ApiError
     */
    public static paymentControllerFindAll(): CancelablePromise<Array<PaymentResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments',
        });
    }
    /**
     * Create a payment
     * @param requestBody
     * @returns PaymentResponseDto
     * @throws ApiError
     */
    public static paymentControllerCreate(
        requestBody: CreatePaymentDto,
    ): CancelablePromise<PaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create a PayPal order
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
     * Capture a PayPal order
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static paymentControllerCaptureOrder(
        requestBody: any,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/paypal-capture-order',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Validate Apple Pay merchant
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static paymentControllerAppleValidateMerchant(
        requestBody: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/payments/apple-validate-merchant',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a payment by ID
     * @param id
     * @returns PaymentResponseDto
     * @throws ApiError
     */
    public static paymentControllerFindOne(
        id: string,
    ): CancelablePromise<PaymentResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/payments/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update a payment
     * @param id
     * @param requestBody
     * @returns PaymentResponseDto
     * @throws ApiError
     */
    public static paymentControllerUpdate(
        id: string,
        requestBody: UpdatePaymentDto,
    ): CancelablePromise<PaymentResponseDto> {
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
