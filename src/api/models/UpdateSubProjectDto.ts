/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateSubProjectDto = {
    /**
     * The name of the sub-project
     */
    name?: string;
    /**
     * Description of the sub-project
     */
    description?: string;
    /**
     * Start date of the sub-project (ISO date string)
     */
    startDate?: string;
    /**
     * End date / Due date of the sub-project (ISO date string)
     */
    endDate?: string;
    /**
     * Array of user IDs assigned to the sub-project
     */
    teamMemberIds?: Array<any[]>;
    /**
     * Indicates whether the sub-project is completed
     */
    isCompleted?: boolean;
};

