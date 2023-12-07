/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateResponseRequest } from '../models/CreateResponseRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ResponsesService {

    /**
     * Get Responses
     * List responses
     * @param questionId
     * @returns Response Successful Response
     * @throws ApiError
     */
    public static getResponses(
        questionId?: string,
    ): CancelablePromise<Array<Response>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/responses',
            query: {
                'question_id': questionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Response
     * Executes a query on the given db_connection_id
     * @param runEvaluator
     * @param sqlResponseOnly
     * @param generateCsv
     * @param requestBody
     * @returns Response Successful Response
     * @throws ApiError
     */
    public static createResponse(
        runEvaluator: boolean = true,
        sqlResponseOnly: boolean = false,
        generateCsv: boolean = false,
        requestBody?: CreateResponseRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/responses',
            query: {
                'run_evaluator': runEvaluator,
                'sql_response_only': sqlResponseOnly,
                'generate_csv': generateCsv,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Response
     * Get a response
     * @param responseId
     * @returns Response Successful Response
     * @throws ApiError
     */
    public static getResponse(
        responseId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/responses/{response_id}',
            path: {
                'response_id': responseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Response
     * Update a response
     * @param responseId
     * @returns Response Successful Response
     * @throws ApiError
     */
    public static updateResponse(
        responseId: string,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/v1/responses/{response_id}',
            path: {
                'response_id': responseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Response File
     * Get a response file
     * @param responseId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getResponseFile(
        responseId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/responses/{response_id}/file',
            path: {
                'response_id': responseId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
