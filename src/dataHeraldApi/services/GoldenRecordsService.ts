/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GoldenRecord } from '../models/GoldenRecord';
import type { GoldenRecordRequest } from '../models/GoldenRecordRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class GoldenRecordsService {

    /**
     * Delete Golden Record
     * Deletes a golden record
     * @param goldenRecordId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteGoldenRecord(
        goldenRecordId: string,
    ): CancelablePromise<Record<string, any>> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/v1/golden-records/{golden_record_id}',
            path: {
                'golden_record_id': goldenRecordId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Golden Records
     * Gets golden records
     * @param dbConnectionId
     * @param page
     * @param limit
     * @returns GoldenRecord Successful Response
     * @throws ApiError
     */
    public static getGoldenRecords(
        dbConnectionId?: string,
        page: number = 1,
        limit: number = 10,
    ): CancelablePromise<Array<GoldenRecord>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/v1/golden-records',
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
     * Add Golden Records
     * @param requestBody
     * @returns GoldenRecord Successful Response
     * @throws ApiError
     */
    public static addGoldenRecords(
        requestBody: Array<GoldenRecordRequest>,
    ): CancelablePromise<Array<GoldenRecord>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/v1/golden-records',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
