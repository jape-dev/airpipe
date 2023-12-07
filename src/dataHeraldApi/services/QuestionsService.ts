/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Question } from '../models/Question';
import type { QuestionRequest } from '../models/QuestionRequest';
import type { Response } from '../models/Response';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class QuestionsService {

    /**
     * Get Questions
     * @param dbConnectionId
     * @returns Question Successful Response
     * @throws ApiError
     */
    public static getQuestions(
        dbConnectionId?: string,
    ): CancelablePromise<Array<Question>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/questions',
            query: {
                'db_connection_id': dbConnectionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Answer Question
     * @param runEvaluator
     * @param generateCsv
     * @param requestBody
     * @returns Response Successful Response
     * @throws ApiError
     */
    public static answerQuestion(
        runEvaluator: boolean = true,
        generateCsv: boolean = false,
        requestBody?: QuestionRequest,
    ): CancelablePromise<Response> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/questions',
            query: {
                'run_evaluator': runEvaluator,
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
     * Get Question
     * Get a question
     * @param questionId
     * @returns Question Successful Response
     * @throws ApiError
     */
    public static getQuestion(
        questionId: string,
    ): CancelablePromise<Question> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/questions/{question_id}',
            path: {
                'question_id': questionId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
