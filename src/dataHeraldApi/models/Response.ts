/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SQLQueryResult } from './SQLQueryResult';

export type Response = {
    id?: string;
    question_id?: string;
    response?: string;
    intermediate_steps?: Array<string>;
    sql_query: string;
    sql_query_result?: SQLQueryResult;
    csv_file_path?: string;
    sql_generation_status?: string;
    error_message?: string;
    exec_time?: number;
    total_tokens?: number;
    total_cost?: number;
    confidence_score?: number;
    created_at?: string;
};

