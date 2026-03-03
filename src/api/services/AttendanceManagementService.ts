/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttendanceByAuthorityDto } from '../models/AttendanceByAuthorityDto';
import type { MarkAttendanceAsAuthoritySuccessDto } from '../models/MarkAttendanceAsAuthoritySuccessDto';
import type { MarkAttendanceSuccessDto } from '../models/MarkAttendanceSuccessDto';
import type { MarkOutAttendanceSuccessDto } from '../models/MarkOutAttendanceSuccessDto';
import type { MarkWeekendExchangeByAuthoritySuccessDto } from '../models/MarkWeekendExchangeByAuthoritySuccessDto';
import type { MyAttendanceSuccessDto } from '../models/MyAttendanceSuccessDto';
import type { SingleUserAttendanceSuccessDto } from '../models/SingleUserAttendanceSuccessDto';
import type { UpdateByAuthorityWeekendSetDto } from '../models/UpdateByAuthorityWeekendSetDto';
import type { UpdateByAuthorityWeekendSetSuccessDto } from '../models/UpdateByAuthorityWeekendSetSuccessDto';
import type { WeekendExchangeByAuthorityDto } from '../models/WeekendExchangeByAuthorityDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AttendanceManagementService {
    /**
     * Mark attendance
     * Marks the authenticated user as present.
     * @returns any
     * @throws ApiError
     */
    public static attendanceControllerPresentAttendance({
        authorization,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<MarkAttendanceSuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/attendance/present',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Get my attendance
     * Retrieves attendance records for the authenticated user.
     * @returns any
     * @throws ApiError
     */
    public static attendanceControllerGetMyAttendance({
        month,
        year,
        authorization,
    }: {
        /**
         * The month for which to retrieve attendance records (1-12)
         */
        month: number,
        /**
         * The year for which to retrieve attendance records
         */
        year: number,
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<MyAttendanceSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/attendance/my-attendance',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'month': month,
                'year': year,
            },
        });
    }
    /**
     * Mark out attendance
     * Marks the authenticated user as out for the day.
     * @returns any
     * @throws ApiError
     */
    public static attendanceControllerOutAttendance({
        authorization,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<MarkOutAttendanceSuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/attendance/out',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Get specific user attendance records - HR, PROJECT MANAGER, TEAM LEADER only
     * Retrieves attendance records for a specific user.
     * @returns any
     * @throws ApiError
     */
    public static attendanceControllerGetSpecificUserAttendance({
        month,
        year,
        userId,
        authorization,
    }: {
        /**
         * The month for which to retrieve attendance records (1-12)
         */
        month: number,
        /**
         * The year for which to retrieve attendance records
         */
        year: number,
        /**
         * The ID of the user whose attendance records are being retrieved
         */
        userId: string,
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<SingleUserAttendanceSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/attendance/user-attendance/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'Authorization': authorization,
            },
            query: {
                'month': month,
                'year': year,
            },
        });
    }
    /**
     * Update weekend by authority
     * Allows the authenticated user to update their and others weekend off.
     * @returns any
     * @throws ApiError
     */
    public static attendanceControllerUpdateWeekendOff({
        userId,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the user with whom the authenticated user wants to update their weekend off
         */
        userId: string,
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * The weekend off values to be set for the user
         */
        requestBody: UpdateByAuthorityWeekendSetDto,
    }): CancelablePromise<UpdateByAuthorityWeekendSetSuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/attendance/update-weekend-by-authority/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Mark attendance by authority
     * Allows an authority (e.g., manager) to mark attendance for a user by providing the necessary details in the request body.
     * @returns any
     * @throws ApiError
     */
    public static attendanceControllerMarkAttendanceByAuthority({
        userId,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the user for whom the attendance is being marked by the authority
         */
        userId: string,
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * The details of the attendance to be marked
         */
        requestBody: AttendanceByAuthorityDto,
    }): CancelablePromise<MarkAttendanceAsAuthoritySuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/attendance/mark-attendance-by-authority/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Weekend exchange by authority
     * Allows an authority (e.g., manager) to mark the weekend exchange for a user by providing the original weekend date and new off date in the request body.
     * @returns any
     * @throws ApiError
     */
    public static attendanceControllerWeekendExchangeByAuthority({
        userId,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the user for whom the weekend exchange is being marked by the authority
         */
        userId: string,
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * The details of the weekend exchange to be marked
         */
        requestBody: WeekendExchangeByAuthorityDto,
    }): CancelablePromise<MarkWeekendExchangeByAuthoritySuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/attendance/weekend-exchange-by-authority/{userId}',
            path: {
                'userId': userId,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
