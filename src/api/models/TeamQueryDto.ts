/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type TeamQueryDto = {
    /**
     * The page number for pagination (1-based index)
     */
    pageNo: number;
    /**
     * The number of items per page (1-100)
     */
    pageSize: number;
    /**
     * Optional free-text search term; can be null or empty
     */
    searchKey?: string;
    /**
     * Filter by team leader MongoDB ObjectId
     */
    team_leader_id?: string;
    /**
     * Filter by project manager MongoDB ObjectId
     */
    project_manager_id?: string;
    /**
     * Filter by department MongoDB ObjectId
     */
    department?: string;
    /**
     * Filter by team type (e.g. FULL_STACK)
     */
    team_type?: string;
};

