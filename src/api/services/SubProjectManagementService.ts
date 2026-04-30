/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSubProjectDto } from '../models/CreateSubProjectDto';
import type { SubProjectByIdSuccessDto } from '../models/SubProjectByIdSuccessDto';
import type { SubProjectCreateSuccessDto } from '../models/SubProjectCreateSuccessDto';
import type { SubProjectDeleteSuccessDto } from '../models/SubProjectDeleteSuccessDto';
import type { SubProjectListSuccessDto } from '../models/SubProjectListSuccessDto';
import type { SubProjectUpdateSuccessDto } from '../models/SubProjectUpdateSuccessDto';
import type { UpdateSubProjectDto } from '../models/UpdateSubProjectDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SubProjectManagementService {
    /**
     * Create sub-project
     * Creates a new sub-project record under a parent project.
     * @returns any
     * @throws ApiError
     */
    public static subProjectControllerCreate({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: CreateSubProjectDto,
    }): CancelablePromise<SubProjectCreateSuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sub-project',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List sub-projects
     * Retrieves a list of sub-projects with optional filtering by parent project.
     * @returns any
     * @throws ApiError
     */
    public static subProjectControllerFindAll({
        pageNo,
        pageSize,
        authorization,
        searchKey,
        projectId,
    }: {
        /**
         * The page number for pagination (1-based index)
         */
        pageNo: number,
        /**
         * The number of items per page for pagination
         */
        pageSize: number,
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * Search term to filter sub-projects by name or description
         */
        searchKey?: string,
        /**
         * Filter sub-projects by parent project ID
         */
        projectId?: string,
    }): CancelablePromise<SubProjectListSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sub-project',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'searchKey': searchKey,
                'projectId': projectId,
            },
        });
    }
    /**
     * Get sub-project by ID
     * Retrieves details of a specific sub-project.
     * @returns any
     * @throws ApiError
     */
    public static subProjectControllerFindOne({
        id,
        authorization,
    }: {
        /**
         * The ID of the sub-project to retrieve
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<SubProjectByIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/sub-project/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Update sub-project
     * Updates an existing sub-project record.
     * @returns any
     * @throws ApiError
     */
    public static subProjectControllerUpdate({
        id,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the sub-project to update
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: UpdateSubProjectDto,
    }): CancelablePromise<SubProjectUpdateSuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/sub-project/{id}',
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
     * Delete sub-project
     * Deletes a sub-project record. Cannot delete if tasks are associated.
     * @returns any
     * @throws ApiError
     */
    public static subProjectControllerRemove({
        id,
        authorization,
    }: {
        /**
         * The ID of the sub-project to delete
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<SubProjectDeleteSuccessDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/sub-project/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
