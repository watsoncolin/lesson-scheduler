/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TransactionResponseDto = {
    id: string;
    userId: string;
    productId?: string;
    scheduleId?: string;
    transactionType: TransactionResponseDto.transactionType;
    creditType: TransactionResponseDto.creditType;
    amount?: number;
    credits: number;
    createdAt: string;
    updatedAt: string;
    studentId?: string;
};
export namespace TransactionResponseDto {
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

