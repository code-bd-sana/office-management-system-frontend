/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TeamCreateSuccessDto } from '../models/TeamCreateSuccessDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TeamManagementService {
    /**
     * Create a new team
     * Create a new team with the provided details.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerCreate({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        requestBody: TeamCreateSuccessDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindAll({
        authorization,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
    }): CancelablePromise<TeamCreateSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindOne({
        id,
        authorization,
    }: {
        id: string,
        /**
         * Bearer token for authentication
         */
        authorization: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerUpdate({
        id,
        authorization,
        requestBody,
    }: {
        id: string,
        /**
         * Bearer token for authentication
         */
        authorization: string,
        requestBody: TeamCreateSuccessDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/team/{id}',
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
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerRemove({
        id,
        authorization,
    }: {
        id: string,
        /**
         * Bearer token for authentication
         */
        authorization: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/team/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
