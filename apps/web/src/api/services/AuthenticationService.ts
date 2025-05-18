/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ForgotPasswordDto } from '../models/ForgotPasswordDto';
import type { RefreshTokenDto } from '../models/RefreshTokenDto';
import type { ResetPasswordDto } from '../models/ResetPasswordDto';
import type { SignInDto } from '../models/SignInDto';
import type { SignUpDto } from '../models/SignUpDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register a new user
     * @param requestBody
     * @returns any User registered successfully
     * @throws ApiError
     */
    public static authenticationControllerSignUp(
        requestBody: SignUpDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Login a user
     * @param requestBody
     * @returns any User logged in successfully
     * @throws ApiError
     */
    public static authenticationControllerSignIn(
        requestBody: SignInDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Refresh authentication tokens
     * @param requestBody
     * @returns any Tokens refreshed successfully
     * @throws ApiError
     */
    public static authenticationControllerRefreshTokens(
        requestBody: RefreshTokenDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh-tokens',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Logout the current user
     * @returns any User logged out successfully
     * @throws ApiError
     */
    public static authenticationControllerLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * Request a password reset email
     * @param requestBody
     * @returns any Password reset email sent
     * @throws ApiError
     */
    public static authenticationControllerForgotPassword(
        requestBody: ForgotPasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/forgot-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Reset user password
     * @param requestBody
     * @returns any Password reset successfully
     * @throws ApiError
     */
    public static authenticationControllerResetPassword(
        requestBody: ResetPasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/reset-password',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
