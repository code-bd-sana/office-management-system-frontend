/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddTeamMemberDto } from '../models/AddTeamMemberDto';
import type { AvailableMembersSuccessDto } from '../models/AvailableMembersSuccessDto';
import type { CreateTeamDto } from '../models/CreateTeamDto';
import type { CreateTeamMembersDto } from '../models/CreateTeamMembersDto';
import type { TeamByIdSuccessDto } from '../models/TeamByIdSuccessDto';
import type { TeamCreateSuccessDto } from '../models/TeamCreateSuccessDto';
import type { TeamDeleteSuccessDto } from '../models/TeamDeleteSuccessDto';
import type { TeamListSuccessDto } from '../models/TeamListSuccessDto';
import type { TeamMemberByTeamIdSuccessDto } from '../models/TeamMemberByTeamIdSuccessDto';
import type { TeamMemberByUserIdSuccessDto } from '../models/TeamMemberByUserIdSuccessDto';
import type { TeamMemberCreateSuccessDto } from '../models/TeamMemberCreateSuccessDto';
import type { TeamMemberDeleteSuccessDto } from '../models/TeamMemberDeleteSuccessDto';
import type { TeamMemberUpdateSuccessDto } from '../models/TeamMemberUpdateSuccessDto';
import type { TeamsByLeaderIdSuccessDto } from '../models/TeamsByLeaderIdSuccessDto';
import type { TeamsByManagerIdSuccessDto } from '../models/TeamsByManagerIdSuccessDto';
import type { TeamUpdateSuccessDto } from '../models/TeamUpdateSuccessDto';
import type { UpdateTeamDto } from '../models/UpdateTeamDto';
import type { UpdateTeamMemberDto } from '../models/UpdateTeamMemberDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TeamManagementService {
    /**
     * Get available members
     * Retrieve all users who are not yet assigned to any team.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerGetAvailableMembers({
        authorization,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
    }): CancelablePromise<AvailableMembersSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/available-members',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Create a new team
     * Create a new team with leader, manager and department info.
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
        requestBody: CreateTeamDto,
    }): CancelablePromise<TeamCreateSuccessDto> {
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
     * Get all teams
     * Retrieve a paginated list of teams. Supports filtering by team_leader_id, project_manager_id, department, and team_type.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindAll({
        authorization,
        pageNo,
        pageSize,
        searchKey,
        teamLeaderId,
        projectManagerId,
        department,
        teamType,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * Page number (1-based)
         */
        pageNo: number,
        /**
         * Items per page
         */
        pageSize: number,
        /**
         * Search by team name
         */
        searchKey?: string,
        /**
         * Filter by team leader ObjectId
         */
        teamLeaderId?: string,
        /**
         * Filter by project manager ObjectId
         */
        projectManagerId?: string,
        /**
         * Filter by department ObjectId
         */
        department?: string,
        /**
         * Filter by team type (e.g. FULL_STACK)
         */
        teamType?: string,
    }): CancelablePromise<TeamListSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team',
            headers: {
                'Authorization': authorization,
            },
            query: {
                'pageNo': pageNo,
                'pageSize': pageSize,
                'searchKey': searchKey,
                'team_leader_id': teamLeaderId,
                'project_manager_id': projectManagerId,
                'department': department,
                'team_type': teamType,
            },
        });
    }
    /**
     * Get teams by leader ID
     * Retrieve all teams where the given user is the team leader.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindByLeaderId({
        authorization,
        id,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * MongoDB ObjectId of the team leader
         */
        id: string,
    }): CancelablePromise<TeamsByLeaderIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/leader/{id}',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Get teams by manager
     * Retrieve all teams where the authenticated user is the project manager.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindByManagerId({
        authorization,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
    }): CancelablePromise<TeamsByManagerIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/manager',
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Get team info for a member
     * Returns the team, leader, manager and all teammates for the given user.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerGetMemberTeamInfo({
        authorization,
        id,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * MongoDB ObjectId of the user (team member)
         */
        id: string,
    }): CancelablePromise<TeamMemberByUserIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/members/{id}/info',
            path: {
                'id': id,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
    /**
     * Update team member
     * Move a team member to a different team.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerUpdateMember({
        authorization,
        id,
        requestBody,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * MongoDB ObjectId of the TeamMember document
         */
        id: string,
        requestBody: UpdateTeamMemberDto,
    }): CancelablePromise<TeamMemberUpdateSuccessDto> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/team/members/{id}',
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
     * Get a team by ID
     * Retrieve a single team by its MongoDB ObjectId.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerFindById({
        authorization,
        id,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * MongoDB ObjectId of the team
         */
        id: string,
    }): CancelablePromise<TeamByIdSuccessDto> {
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
     * Update a team
     * Update an existing team by its MongoDB ObjectId.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerUpdate({
        authorization,
        id,
        requestBody,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * MongoDB ObjectId of the team to update
         */
        id: string,
        requestBody: UpdateTeamDto,
    }): CancelablePromise<TeamUpdateSuccessDto> {
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
     * Delete a team
     * Delete a team by its MongoDB ObjectId.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerRemove({
        authorization,
        id,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * MongoDB ObjectId of the team to delete
         */
        id: string,
    }): CancelablePromise<TeamDeleteSuccessDto> {
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
    /**
     * Add a member to a team
     * Add a user to the specified team.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerAddMember({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        requestBody: AddTeamMemberDto,
    }): CancelablePromise<TeamMemberCreateSuccessDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/team/members',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Remove a member from a team
     * Remove a user from the specified team.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerRemoveMember({
        authorization,
        requestBody,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        requestBody: CreateTeamMembersDto,
    }): CancelablePromise<TeamMemberDeleteSuccessDto> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/team/members',
            headers: {
                'Authorization': authorization,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get all members of a team
     * Returns the team details along with all members for the given team.
     * @returns any
     * @throws ApiError
     */
    public static teamManagementControllerGetTeamMembers({
        authorization,
        teamId,
    }: {
        /**
         * Bearer token for authentication
         */
        authorization: string,
        /**
         * MongoDB ObjectId of the team
         */
        teamId: string,
    }): CancelablePromise<TeamMemberByTeamIdSuccessDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/team/{teamId}/members',
            path: {
                'teamId': teamId,
            },
            headers: {
                'Authorization': authorization,
            },
        });
    }
}
