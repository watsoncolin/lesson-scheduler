/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateInstructorDto } from '../models/CreateInstructorDto';
import type { InstructorResponseDto } from '../models/InstructorResponseDto';
import type { UpdateInstructorDto } from '../models/UpdateInstructorDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class InstructorsService {
    /**
     * @returns InstructorResponseDto
     * @throws ApiError
     */
    public static instructorControllerFindAll(): CancelablePromise<Array<InstructorResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/instructors',
        });
    }
    /**
     * @param requestBody
     * @returns InstructorResponseDto
     * @throws ApiError
     */
    public static instructorControllerCreate(
        requestBody: CreateInstructorDto,
    ): CancelablePromise<InstructorResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/instructors',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns InstructorResponseDto
     * @throws ApiError
     */
    public static instructorControllerFindOne(
        id: string,
    ): CancelablePromise<InstructorResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/instructors/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Instructor not found`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns InstructorResponseDto
     * @throws ApiError
     */
    public static instructorControllerUpdate(
        id: string,
        requestBody: UpdateInstructorDto,
    ): CancelablePromise<InstructorResponseDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/instructors/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Instructor not found`,
            },
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static instructorControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/instructors/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Instructor not found`,
            },
        });
    }
}
