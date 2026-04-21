/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTeamManagementDto } from '../models/CreateTeamManagementDto';
import type { UpdateTeamManagementDto } from '../models/UpdateTeamManagementDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TeamManagementService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerCreate({
        requestBody,
    }: {
        requestBody: CreateTeamManagementDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team-management',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindAll(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team-management',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team-management/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: UpdateTeamManagementDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/team-management/{id}',
            path: {
                'id': id,
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
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/team-management/{id}',
            path: {
                'id': id,
            },
        });
    }
}
