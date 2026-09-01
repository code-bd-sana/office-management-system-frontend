/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateProjectDto = {
    /**
     * Project start date (ISO date string)
     */
    startDate?: string;
    /**
     * Project end date (ISO date string)
     */
    endDate?: string;
    /**
     * The name of the project
     */
    name: string;
    /**
     * The ID of the client associated with the project
     */
    client?: string;
    /**
     * External order identifier associated with the project
     */
    orderId: string;
    /**
     * The ID of the profile associated with the project
     */
    profile?: string;
    /**
     * The ID of the department currently assigned to the project
     */
    assignedDepartment?: string;
    /**
     * The team assigned to the project
     */
    assignedTeam?: string;
    /**
     * The team assigned to the project - Wordpress, Shopify, Custom, Sales
     */
    projectTeam?: CreateProjectDto.projectTeam;
    /**
     * List of project file URLs or storage paths
     */
    projectFiles: Array<string>;
    /**
     * Internal remarks or notes about the project
     */
    projectRemarks: string;
    /**
     * The due date for the project (ISO date string)
     */
    dueDate?: string;
    /**
     * The current status of the project - NULL, NRA, WIP, DELIVERED, CANCELLED, REVISION
     */
    status: CreateProjectDto.status;
    /**
     * Price value of the project
     */
    value?: number;
};
export namespace CreateProjectDto {
    /**
     * The team assigned to the project - Wordpress, Shopify, Custom, Sales
     */
    export enum projectTeam {
        WORDPRESS = 'Wordpress',
        SHOPIFY = 'Shopify',
        CUSTOM = 'Custom',
        SALES = 'Sales',
    }
    /**
     * The current status of the project - NULL, NRA, WIP, DELIVERED, CANCELLED, REVISION
     */
    export enum status {
        NULL = 'NULL',
        NRA = 'NRA',
        WIP = 'WIP',
        DELIVERED = 'DELIVERED',
        CANCELLED = 'CANCELLED',
        REVISION = 'REVISION',
    }
}

