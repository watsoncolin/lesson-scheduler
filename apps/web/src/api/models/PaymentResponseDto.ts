/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type PaymentResponseDto = {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    productId: string;
    paymentGateway: Record<string, any>;
    paymentGatewayId: string;
    amount: number;
    quantity: number;
    status: Record<string, any>;
    scheduleId?: string;
    studentId?: string;
};

