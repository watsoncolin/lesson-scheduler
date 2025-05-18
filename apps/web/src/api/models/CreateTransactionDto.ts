/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTransactionDto = {
    userId: string;
    productId?: string;
    scheduleId?: string;
    transactionType: CreateTransactionDto.transactionType;
    creditType: CreateTransactionDto.creditType;
    credits: number;
    amount?: number;
    paymentId?: string;
    studentId?: string;
};
export namespace CreateTransactionDto {
    export enum transactionType {
        PURCHASE_CREDITS = 'PURCHASE_CREDITS',
        REGISTER = 'REGISTER',
        CANCEL_REGISTRATION = 'CANCEL_REGISTRATION',
    }
    export enum creditType {
        PRIVATE = 'private',
        GROUP = 'group',
    }
}

