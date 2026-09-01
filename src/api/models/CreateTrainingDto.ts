/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CreateTrainingDto = {
    title: string;
    description?: string;
    note?: string;
    resourceLink: string;
    provider?: string;
    category?: string;
    level?: CreateTrainingDto.level;
    durationMinutes?: number;
    language?: string;
    thumbnail?: string;
    tags?: Array<string>;
    expiresAt?: string;
};
export namespace CreateTrainingDto {
    export enum level {
        BEGINNER = 'BEGINNER',
        INTERMEDIATE = 'INTERMEDIATE',
        ADVANCED = 'ADVANCED',
    }
}

