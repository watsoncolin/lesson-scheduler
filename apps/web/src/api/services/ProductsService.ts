/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateProductDto } from '../models/CreateProductDto';
import type { ProductResponseDto } from '../models/ProductResponseDto';
import type { UpdateProductDto } from '../models/UpdateProductDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ProductsService {
    /**
     * Get all products
     * @returns ProductResponseDto List of products
     * @throws ApiError
     */
    public static productControllerFindAll(): CancelablePromise<Array<ProductResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products',
        });
    }
    /**
     * Create a new product
     * @param requestBody
     * @returns ProductResponseDto Product created
     * @throws ApiError
     */
    public static productControllerCreate(
        requestBody: CreateProductDto,
    ): CancelablePromise<ProductResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/products',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get a product by ID
     * @param id Product ID
     * @returns ProductResponseDto Product found
     * @throws ApiError
     */
    public static productControllerFindOne(
        id: string,
    ): CancelablePromise<ProductResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Product not found`,
            },
        });
    }
    /**
     * Update a product by ID
     * @param id Product ID
     * @param requestBody
     * @returns ProductResponseDto Product updated
     * @throws ApiError
     */
    public static productControllerUpdate(
        id: string,
        requestBody: UpdateProductDto,
    ): CancelablePromise<ProductResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Product not found`,
            },
        });
    }
    /**
     * Delete a product by ID
     * @param id Product ID
     * @returns void
     * @throws ApiError
     */
    public static productControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/products/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Product not found`,
            },
        });
    }
}
