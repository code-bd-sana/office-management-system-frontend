/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateSellsShiftManagementDto } from '../models/CreateSellsShiftManagementDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class SellsShiftManagementService {
    /**
     * Create a new sells shift management entry for a user
     * Creates a new sells shift management entry for a user. This endpoint is protected and requires the user to have the SUPER ADMIN role.
     * @returns any
     * @throws ApiError
     */
    public static sellsShiftManagementControllerCreate({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token
         */
        authorization: string,
        requestBody: CreateSellsShiftManagementDto,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/sells-shift-management/{userId}',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
