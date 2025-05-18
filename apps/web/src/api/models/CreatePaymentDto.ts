/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreatePaymentDto = {
    userId: string;
    productId: string;
    quantity: number;
    paymentGateway: CreatePaymentDto.paymentGateway;
    paymentGatewayId: string;
    status: CreatePaymentDto.status;
    scheduleId?: string;
    studentId?: string;
};
export namespace CreatePaymentDto {
    export enum paymentGateway {
        PAYPAL = 'PAYPAL',
        APPLE_PAY = 'APPLE_PAY',
    }
    export enum status {
        PENDING = 'PENDING',
        SUCCESS = 'SUCCESS',
        FAILED = 'FAILED',
    }
}

