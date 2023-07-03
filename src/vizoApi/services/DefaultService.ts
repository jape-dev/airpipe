/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdAccount } from '../models/AdAccount';
import type { Body_login_for_access_token_user_auth_token_post } from '../models/Body_login_for_access_token_user_auth_token_post';
import type { ChainResult } from '../models/ChainResult';
import type { Completion } from '../models/Completion';
import type { CurrentResults } from '../models/CurrentResults';
import type { DataSource } from '../models/DataSource';
import type { DataSourceInDB } from '../models/DataSourceInDB';
import type { DebugResponse } from '../models/DebugResponse';
import type { FacebookQuery } from '../models/FacebookQuery';
import type { FacebookQueryResults } from '../models/FacebookQueryResults';
import type { GoogleQuery } from '../models/GoogleQuery';
import type { GoogleQueryResults } from '../models/GoogleQueryResults';
import type { Prompt } from '../models/Prompt';
import type { QueryResults } from '../models/QueryResults';
import type { Schema } from '../models/Schema';
import type { SqlQuery } from '../models/SqlQuery';
import type { TableColumns } from '../models/TableColumns';
import type { Token } from '../models/Token';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Auth
     * @returns any Successful Response
     * @throws ApiError
     */
    public static authConnectorGoogleAuthGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/google/auth',
        });
    }

    /**
     * Oauth2 Callback
     * @returns any Successful Response
     * @throws ApiError
     */
    public static oauth2CallbackConnectorGoogleOauth2CallbackGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/google/oauth2_callback',
        });
    }

    /**
     * Ad Accounts
     * @param token 
     * @returns AdAccount Successful Response
     * @throws ApiError
     */
    public static adAccountsConnectorGoogleAdAccountsGet(
token: string,
): CancelablePromise<Array<AdAccount>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/google/ad_accounts',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Run Query
     * @param token 
     * @param requestBody 
     * @returns GoogleQueryResults Successful Response
     * @throws ApiError
     */
    public static runQueryConnectorGoogleRunQueryPost(
token: string,
requestBody: GoogleQuery,
): CancelablePromise<GoogleQueryResults> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/connector/google/run_query',
            query: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login
     * @returns any Successful Response
     * @throws ApiError
     */
    public static loginConnectorFacebookLoginGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/facebook/login',
        });
    }

    /**
     * Ad Accounts
     * @param token 
     * @returns AdAccount Successful Response
     * @throws ApiError
     */
    public static adAccountsConnectorFacebookAdAccountsGet(
token: string,
): CancelablePromise<Array<AdAccount>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/facebook/ad_accounts',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Run Query
     * @param token 
     * @param requestBody 
     * @returns FacebookQueryResults Successful Response
     * @throws ApiError
     */
    public static runQueryConnectorFacebookRunQueryPost(
token: string,
requestBody: FacebookQuery,
): CancelablePromise<FacebookQueryResults> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/connector/facebook/run_query',
            query: {
                'token': token,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Table Columns
     * @param tableName 
     * @returns TableColumns Successful Response
     * @throws ApiError
     */
    public static getTableColumnsQueryTableColumnsGet(
tableName: string,
): CancelablePromise<TableColumns> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/table_columns',
            query: {
                'table_name': tableName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Run Query
     * @param query 
     * @returns QueryResults Successful Response
     * @throws ApiError
     */
    public static runQueryQueryRunQueryGet(
query: string,
): CancelablePromise<QueryResults> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/run_query',
            query: {
                'query': query,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Table Results
     * @param tableName 
     * @returns CurrentResults Successful Response
     * @throws ApiError
     */
    public static tableResultsQueryTableResultsGet(
tableName: string,
): CancelablePromise<CurrentResults> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/table_results',
            query: {
                'table_name': tableName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create New Table
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createNewTableQueryCreateNewTablePost(
requestBody: CurrentResults,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/create_new_table',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Data Source
     * @param requestBody 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static addDataSourceQueryAddDataSourcePost(
requestBody: DataSource,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/add_data_source',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Data Sources
     * @param email 
     * @returns DataSourceInDB Successful Response
     * @throws ApiError
     */
    public static dataSourcesQueryDataSourcesGet(
email: string,
): CancelablePromise<Array<DataSourceInDB>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/data_sources',
            query: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Codex
     * @param prompt 
     * @param completion 
     * @returns Completion Code completion response from codex
     * @throws ApiError
     */
    public static codexQueryCodexGet(
prompt: string,
completion?: string,
): CancelablePromise<Completion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/codex',
            query: {
                'prompt': prompt,
                'completion': completion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Sql Query
     * @param prompt 
     * @param requestBody 
     * @returns SqlQuery Successful Response
     * @throws ApiError
     */
    public static sqlQueryQuerySqlQueryPost(
prompt: string,
requestBody: Schema,
): CancelablePromise<SqlQuery> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/sql_query',
            query: {
                'prompt': prompt,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Debug Prompt
     * @param query 
     * @param error 
     * @param requestBody 
     * @param prompt 
     * @returns DebugResponse Successful Response
     * @throws ApiError
     */
    public static debugPromptQueryDebugPromptPost(
query: string,
error: string,
requestBody: Schema,
prompt?: string,
): CancelablePromise<DebugResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/debug_prompt',
            query: {
                'query': query,
                'error': error,
                'prompt': prompt,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Ask Question
     * @param requestBody 
     * @returns ChainResult Successful Response
     * @throws ApiError
     */
    public static askQuestionQueryAskQuestionPost(
requestBody: Prompt,
): CancelablePromise<ChainResult> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/ask_question',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Chart Type
     * @param input 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static chartTypeQueryChartTypePost(
input: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/chart_type',
            query: {
                'input': input,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Login For Access Token
     * @param formData 
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginForAccessTokenUserAuthTokenPost(
formData: Body_login_for_access_token_user_auth_token_post,
): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/auth/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Current User
     * @param token 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static currentUserUserAuthCurrentUserGet(
token: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/auth/current_user',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Customer
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static createCustomerUserCreateCustomerPost(
requestBody: User,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/create_customer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Root
     * @returns string Successful Response
     * @throws ApiError
     */
    public static readRootGet(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

}
