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
export class MyStudentService {
    /**
     * Create a student for the current user
     * @param requestBody
     * @returns StudentResponseDto Student created
     * @throws ApiError
     */
    public static myStudentControllerCreate(
        requestBody: CreateStudentDto,
    ): CancelablePromise<StudentResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/me/students',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all students for the current user
     * @returns StudentResponseDto List of students
     * @throws ApiError
     */
    public static myStudentControllerFindMyStudents(): CancelablePromise<Array<StudentResponseDto>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me/students',
        });
    }
    /**
     * Get a student by ID for the current user
     * @param id Student ID
     * @returns StudentResponseDto Student found
     * @throws ApiError
     */
    public static myStudentControllerFindOne(
        id: string,
    ): CancelablePromise<StudentResponseDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/me/students/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Student not found`,
            },
        });
    }
    /**
     * Update a student by ID for the current user
     * @param id Student ID
     * @param requestBody
     * @returns StudentResponseDto Student updated
     * @throws ApiError
     */
    public static myStudentControllerUpdate(
        id: string,
        requestBody: UpdateStudentDto,
    ): CancelablePromise<StudentResponseDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/users/me/students/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `Student not found`,
            },
        });
    }
    /**
     * Delete a student by ID for the current user
     * @param id Student ID
     * @returns void
     * @throws ApiError
     */
    public static myStudentControllerRemove(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/me/students/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Student not found`,
            },
        });
    }
}
