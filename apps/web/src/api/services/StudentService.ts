/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateStudentDto } from '../models/CreateStudentDto';
import type { StudentResponseDto } from '../models/StudentResponseDto';
import type { UpdateStudentDto } from '../models/UpdateStudentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StudentService {
    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static studentControllerCreate(
        requestBody: CreateStudentDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/students',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static studentControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/students',
        });
    }
    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static studentControllerFindOne(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/students/{id}',
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
    public static studentControllerUpdate(
        id: string,
        requestBody: UpdateStudentDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/students/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static studentControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/students/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all students for a user
     * @param userId
     * @returns StudentResponseDto
     * @throws ApiError
     */
    public static userStudentControllerFindAllByUserId(
        userId: string,
    ): CancelablePromise<Array<StudentResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/{userId}/students',
            path: {
                'userId': userId,
            },
        });
    }
}
