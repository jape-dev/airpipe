/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from '../models/Query';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SqlQueriesService {

    /**
     * Execute Sql Query
     * Executes a query on the given db_connection_id
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static executeSqlQuery(
        requestBody: Query,
    ): CancelablePromise<Array<any>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/sql-query-executions',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
