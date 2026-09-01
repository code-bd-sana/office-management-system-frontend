/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTrainingDto } from '../models/CreateTrainingDto';
import type { UpdateTrainingActiveStatusDto } from '../models/UpdateTrainingActiveStatusDto';
import type { UpdateTrainingDto } from '../models/UpdateTrainingDto';
import type { UpdateTrainingPublicationDto } from '../models/UpdateTrainingPublicationDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TrainingManagementService {
    /**
     * Create a training resource
     * @returns any
     * @throws ApiError
     */
    public static trainingControllerCreate({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: CreateTrainingDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/training',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * List available training resources
     * @returns any
     * @throws ApiError
     */
    public static trainingControllerFindAll({
        authorization,
        pageNo,
        pageSize,
        searchKey,
        category,
        level,
        tag,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * The page number for pagination (1-based index)
         */
        pageNo: number,
        /**
         * The number of items per page (1-100)
         */
        pageSize: number,
        /**
         * Optional free-text search term; can be null or empty
         */
        searchKey?: string,
        category?: string,
        level?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
        tag?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/training',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'searchKey': searchKey,
                'category': category,
                'level': level,
                'tag': tag,
            },
        });
    }
    /**
     * Get a training resource
     * @returns any
     * @throws ApiError
     */
    public static trainingControllerFindOne({
        authorization,
        id,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * Training MongoDB ObjectId
         */
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/training/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Update a training resource
     * @returns any
     * @throws ApiError
     */
    public static trainingControllerUpdate({
        authorization,
        id,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * Training MongoDB ObjectId
         */
        id: string,
        requestBody: UpdateTrainingDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/training/{id}',
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
     * Delete a training resource
     * @returns any
     * @throws ApiError
     */
    public static trainingControllerRemove({
        authorization,
        id,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * Training MongoDB ObjectId
         */
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/training/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Publish or unpublish a training resource
     * @returns any
     * @throws ApiError
     */
    public static trainingControllerUpdatePublication({
        authorization,
        id,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * Training MongoDB ObjectId
         */
        id: string,
        requestBody: UpdateTrainingPublicationDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/training/{id}/publication',
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
     * Activate or deactivate a training resource
     * @returns any
     * @throws ApiError
     */
    public static trainingControllerUpdateActiveStatus({
        authorization,
        id,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        /**
         * Training MongoDB ObjectId
         */
        id: string,
        requestBody: UpdateTrainingActiveStatusDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/training/{id}/active-status',
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
