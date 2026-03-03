/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateDepartmentDto } from '../models/CreateDepartmentDto';
import type { DepartmentByIdSuccessDto } from '../models/DepartmentByIdSuccessDto';
import type { DepartmentCreateSuccessDto } from '../models/DepartmentCreateSuccessDto';
import type { DepartmentDeleteSuccessDto } from '../models/DepartmentDeleteSuccessDto';
import type { DepartmentPatchSuccessDto } from '../models/DepartmentPatchSuccessDto';
import type { DepartmentsListSuccessDto } from '../models/DepartmentsListSuccessDto';
import type { UpdateDepartmentDto } from '../models/UpdateDepartmentDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DepartmentManagementService {
    /**
     * Create department
     * Creates a new department in the organization.
     * @returns any
     * @throws ApiError
     */
    public static departmentControllerCreate({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: CreateDepartmentDto,
    }): CancelablePromise<DepartmentCreateSuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/department',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List departments
     * Retrieves a list of departments with optional filtering.
     * @returns any
     * @throws ApiError
     */
    public static departmentControllerFindAll({
        pageNo,
        pageSize,
        searchKey = '',
    }: {
        /**
         * The page number for pagination (1-based index)
         */
        pageNo: number,
        /**
         * The number of items per page (1-100)
         */
        pageSize: number,
        /**
         * Optional free-text search term to filter departments by name or description
         */
        searchKey?: string,
    }): CancelablePromise<DepartmentsListSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/department',
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'searchKey': searchKey,
            },
        });
    }
    /**
     * Get department by ID
     * Retrieves details of a specific department.
     * @returns any
     * @throws ApiError
     */
    public static departmentControllerFindOne({
        id,
    }: {
        /**
         * The ID of the department to retrieve
         */
        id: string,
    }): CancelablePromise<DepartmentByIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/department/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Update department
     * Updates an existing department's details.
     * @returns any
     * @throws ApiError
     */
    public static departmentControllerUpdate({
        id,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the department to retrieve
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: UpdateDepartmentDto,
    }): CancelablePromise<DepartmentPatchSuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/department/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete department
     * Deletes a department by its ID.
     * @returns any
     * @throws ApiError
     */
    public static departmentControllerRemove({
        id,
        authorization,
    }: {
        /**
         * The ID of the department to retrieve
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<DepartmentDeleteSuccessDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/department/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
