/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Instruction } from '../models/Instruction';
import type { InstructionRequest } from '../models/InstructionRequest';
import type { UpdateInstruction } from '../models/UpdateInstruction';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class InstructionsService {

    /**
     * Get Instructions
     * Gets instructions
     * @param dbConnectionId
     * @param page
     * @param limit
     * @returns Instruction Successful Response
     * @throws ApiError
     */
    public static getInstructions(
        dbConnectionId?: string,
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<Array<Instruction>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/instructions',
            query: {
                'db_connection_id': dbConnectionId,
                'page': page,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Instruction
     * Adds an instruction
     * @param requestBody
     * @returns Instruction Successful Response
     * @throws ApiError
     */
    public static addInstruction(
        requestBody: InstructionRequest,
    ): CancelablePromise<Instruction> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/instructions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Instruction
     * Updates an instruction
     * @param instructionId
     * @param requestBody
     * @returns Instruction Successful Response
     * @throws ApiError
     */
    public static updateInstruction(
        instructionId: string,
        requestBody: UpdateInstruction,
    ): CancelablePromise<Instruction> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/v1/instructions/{instruction_id}',
            path: {
                'instruction_id': instructionId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Instruction
     * Deletes an instruction
     * @param instructionId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteInstruction(
        instructionId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/instructions/{instruction_id}',
            path: {
                'instruction_id': instructionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
