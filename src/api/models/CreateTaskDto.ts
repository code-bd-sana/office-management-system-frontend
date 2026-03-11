/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTaskDto = {
    /**
     * The name of the task
     */
    name: string;
    /**
     * The project associated with the task
     */
    project: string;
    /**
     * The due date for the task (ISO date string)
     */
    dueDate: string;
    /**
     * The priority level of the task - LOW, MEDIUM, HIGH, CRITICAL
     */
    priority: CreateTaskDto.priority;
    /**
     * A brief description of the task
     */
    description: string;
    /**
     * The current status of the task - PENDING, WORK_IN_PROGRESS, COMPLETED, BLOCKED, DELIVERED
     */
    status: CreateTaskDto.status;
    /**
     * List of user IDs to assign the task to
     */
    assignTo: Array<string>;
};
export namespace CreateTaskDto {
    /**
     * The priority level of the task - LOW, MEDIUM, HIGH, CRITICAL
     */
    export enum priority {
        LOW = 'LOW',
        MEDIUM = 'MEDIUM',
        HIGH = 'HIGH',
        CRITICAL = 'CRITICAL',
    }
    /**
     * The current status of the task - PENDING, WORK_IN_PROGRESS, COMPLETED, BLOCKED, DELIVERED
     */
    export enum status {
        PENDING = 'PENDING',
        WORK_IN_PROGRESS = 'WORK_IN_PROGRESS',
        COMPLETED = 'COMPLETED',
        BLOCKED = 'BLOCKED',
        DELIVERED = 'DELIVERED',
    }
}

