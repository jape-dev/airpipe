/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_for_access_token_token_post } from '../models/Body_login_for_access_token_token_post';
import type { Completion } from '../models/Completion';
import type { GoogleAd } from '../models/GoogleAd';
import type { QueryResults } from '../models/QueryResults';
import type { SqlQuery } from '../models/SqlQuery';
import type { TableColumns } from '../models/TableColumns';
import type { Token } from '../models/Token';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Login For Access Token
     * @param formData 
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginForAccessTokenTokenPost(
formData: Body_login_for_access_token_token_post,
): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Users Me
     * @returns User Successful Response
     * @throws ApiError
     */
    public static readUsersMeUsersMeGet(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/me/',
        });
    }

    /**
     * Hello World
     * @returns any Successful Response
     * @throws ApiError
     */
    public static helloWorldGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/',
        });
    }

    /**
     * Codex
     * @param prompt 
     * @param completion 
     * @returns Completion Code completion response from codex
     * @throws ApiError
     */
    public static codexCodexGet(
prompt: string,
completion?: string,
): CancelablePromise<Completion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/codex',
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
     * Get All Google Ads
     * @returns GoogleAd Successful Response
     * @throws ApiError
     */
    public static getAllGoogleAdsAdsGet(): CancelablePromise<Array<GoogleAd>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/ads',
        });
    }

    /**
     * Get Table Columns
     * @param tableName 
     * @returns TableColumns Successful Response
     * @throws ApiError
     */
    public static getTableColumnsTableColumnsGet(
tableName: string,
): CancelablePromise<TableColumns> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/table_columns',
            query: {
                'table_name': tableName,
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
    public static sqlQuerySqlQueryPost(
prompt: string,
requestBody: TableColumns,
): CancelablePromise<SqlQuery> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/sql_query',
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
     * Run Query
     * @param query 
     * @returns QueryResults Successful Response
     * @throws ApiError
     */
    public static runQueryRunQueryGet(
query: string,
): CancelablePromise<QueryResults> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/run_query',
            query: {
                'query': query,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Facebook Auth
     * @returns any Successful Response
     * @throws ApiError
     */
    public static facebookAuthFacebookAuthGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/facebook_auth',
        });
    }

    /**
     * Facebook Login
     * @returns any Successful Response
     * @throws ApiError
     */
    public static facebookLoginFacebookLoginGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/facebook_login',
        });
    }

    /**
     * Create Customer
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static createCustomerCreateCustomerPost(
requestBody: User,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/create_customer',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
