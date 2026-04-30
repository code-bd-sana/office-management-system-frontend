/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTeamDto = {
    /**
     * The name of the team
     */
    name: string;
    /**
     * Team type like FULL_STACK, WORDPRESS, etc
     */
    team_type: string;
    /**
     * Project manager info
     */
    project_manager_id: string;
    /**
     * Team leader info
     */
    team_leader_id: string;
    /**
     * Department name
     */
    department: string;
};

