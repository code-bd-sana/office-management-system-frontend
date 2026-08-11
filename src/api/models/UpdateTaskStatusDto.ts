/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateTaskStatusDto = {
    /**
     * The new status - PENDING, WORK_IN_PROGRESS, COMPLETED, BLOCKED, REJECTED, DELIVERED
     */
    status: Record<string, any>;
    /**
     * Required explanation when status is BLOCKED
     */
    blockedReason?: string;
};

