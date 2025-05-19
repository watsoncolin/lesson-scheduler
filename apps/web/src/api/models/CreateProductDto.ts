/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProductDto = {
    /**
     * Order of the product
     */
    order: number;
    /**
     * Name of the product
     */
    name: string;
    /**
     * Type of lesson
     */
    lessonType: CreateProductDto.lessonType;
    /**
     * Product description
     */
    description: string;
    /**
     * Number of credits
     */
    credits: number;
    /**
     * Amount for the product
     */
    amount: number;
    /**
     * Is the product active?
     */
    active: boolean;
    /**
     * Optional schedule ID
     */
    scheduleId?: string;
    /**
     * List of product features
     */
    features: Array<string>;
};
export namespace CreateProductDto {
    /**
     * Type of lesson
     */
    export enum lessonType {
        PRIVATE = 'private',
        GROUP = 'group',
    }
}

