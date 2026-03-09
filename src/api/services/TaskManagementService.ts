/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { TaskByIdSuccessDto } from '../models/TaskByIdSuccessDto';
import type { TaskCreateSuccessDto } from '../models/TaskCreateSuccessDto';
import type { TaskDeleteSuccessDto } from '../models/TaskDeleteSuccessDto';
import type { TaskListSuccessDto } from '../models/TaskListSuccessDto';
import type { TaskStatusUpdateFoundDto } from '../models/TaskStatusUpdateFoundDto';
import type { TaskUpdateSuccessDto } from '../models/TaskUpdateSuccessDto';
import type { UpdateTaskDto } from '../models/UpdateTaskDto';
import type { UpdateTaskStatusDto } from '../models/UpdateTaskStatusDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TaskManagementService {
    /**
     * Create a new task
     * Creates a new task in the system. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerCreate({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: CreateTaskDto,
    }): CancelablePromise<TaskCreateSuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all tasks
     * Retrieves a list of all tasks. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerFindAll({
        pageNo,
        pageSize,
        authorization,
        searchKey,
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
         * Bearer token
         */
        authorization: string,
        /**
         * Optional free-text search term; can be null or empty
         */
        searchKey?: string,
    }): CancelablePromise<TaskListSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'searchKey': searchKey,
            },
        });
    }
    /**
     * Get a task by ID
     * Retrieves a specific task by its ID. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerFindOne({
        authorization,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<TaskByIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task/{id}',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Update a task by ID
     * Updates a specific task by its ID. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerUpdate({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: UpdateTaskDto,
    }): CancelablePromise<TaskUpdateSuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/task/{id}',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete a task by ID
     * Deletes a specific task by its ID. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerDelete({
        authorization,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<TaskDeleteSuccessDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/task/{id}',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Update a task's status by ID
     * Updates the status of a specific task by its ID. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerUpdateTaskStatus({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: UpdateTaskStatusDto,
    }): CancelablePromise<TaskStatusUpdateFoundDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/task/{id}/status',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
