/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { ReplyOnDcrReviewDto } from '../models/ReplyOnDcrReviewDto';
import type { TaskByIdSuccessDto } from '../models/TaskByIdSuccessDto';
import type { TaskCreateSuccessDto } from '../models/TaskCreateSuccessDto';
import type { TaskDcrReviewReplySuccessDto } from '../models/TaskDcrReviewReplySuccessDto';
import type { TaskDcrSubmissionStatusSuccessDto } from '../models/TaskDcrSubmissionStatusSuccessDto';
import type { TaskDcrSubmitSuccessDto } from '../models/TaskDcrSubmitSuccessDto';
import type { TaskDeleteSuccessDto } from '../models/TaskDeleteSuccessDto';
import type { TaskListSuccessDto } from '../models/TaskListSuccessDto';
import type { TaskStatusUpdateFoundDto } from '../models/TaskStatusUpdateFoundDto';
import type { TaskUpdateSuccessDto } from '../models/TaskUpdateSuccessDto';
import type { UpdateDcrSubmissionStatusDto } from '../models/UpdateDcrSubmissionStatusDto';
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
        status,
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
         * Search term to filter projects by name or order ID
         */
        searchKey?: string,
        /**
         * Filter projects by status
         */
        status?: 'PENDING' | 'WORK_IN_PROGRESS' | 'COMPLETED' | 'BLOCKED' | 'DELIVERED',
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
                'status': status,
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
        id,
        authorization,
    }: {
        /**
         * The ID of the task to retrieve
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<TaskByIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/task/{id}',
            path: {
                'id': id,
            },
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
        id,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the task to update
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: UpdateTaskDto,
    }): CancelablePromise<TaskUpdateSuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/task/{id}',
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
     * Delete a task by ID
     * Deletes a specific task by its ID. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerDelete({
        id,
        authorization,
    }: {
        /**
         * The ID of the task to retrieve
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
    }): CancelablePromise<TaskDeleteSuccessDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/task/{id}',
            path: {
                'id': id,
            },
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
        id,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the task to update the status for
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: UpdateTaskStatusDto,
    }): CancelablePromise<TaskStatusUpdateFoundDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/task/{id}/status',
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
     * Submit a DCR for a task
     * Submits a DCR (Design Change Request) for a specific task. Requires authentication and appropriate permissions. Accepts multipart/form-data for DCR file uploads.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerSubmitDcr({
        id,
        authorization,
        formData,
    }: {
        /**
         * The ID of the task for which the DCR is being submitted
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
        formData: {
            /**
             * The files being submitted as part of the DCR
             */
            dcrFiles: Array<Blob>;
        },
    }): CancelablePromise<TaskDcrSubmitSuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task/{id}/dcr-submit',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * Update the DCR submission status of a task
     * Updates the DCR submission status of a specific task by its ID. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerUpdateDcrSubmissionStatus({
        id,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the task for which the DCR submission status is being updated
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: UpdateDcrSubmissionStatusDto,
    }): CancelablePromise<TaskDcrSubmissionStatusSuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/task/{id}/dcr-submission-status',
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
     * Reply on a DCR review for a task
     * Replies to a DCR review for a specific task by its ID. Requires authentication and appropriate permissions.
     * @returns any
     * @throws ApiError
     */
    public static taskControllerReplyOnDcrReview({
        id,
        authorization,
        requestBody,
    }: {
        /**
         * The ID of the task for which the DCR review reply is being made
         */
        id: string,
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: ReplyOnDcrReviewDto,
    }): CancelablePromise<TaskDcrReviewReplySuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/task/{id}/reply-on-dcr-review',
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
}
