/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdAccount } from '../models/AdAccount';
import type { Body_check_ambiguous_columns_query_check_ambiguous_columns_post } from '../models/Body_check_ambiguous_columns_query_check_ambiguous_columns_post';
import type { Body_login_for_access_token_user_auth_token_post } from '../models/Body_login_for_access_token_user_auth_token_post';
import type { ChannelType } from '../models/ChannelType';
import type { Conversation } from '../models/Conversation';
import type { CurrentResults } from '../models/CurrentResults';
import type { DataSource } from '../models/DataSource';
import type { DataSourceInDB } from '../models/DataSourceInDB';
import type { FieldOption } from '../models/FieldOption';
import type { LookerDataRequest } from '../models/LookerDataRequest';
import type { LookerField } from '../models/LookerField';
import type { QueryResults } from '../models/QueryResults';
import type { SpreadsheetResponse } from '../models/SpreadsheetResponse';
import type { SpreadsheetWithRefreshToken } from '../models/SpreadsheetWithRefreshToken';
import type { SuccessResponse } from '../models/SuccessResponse';
import type { TableColumns } from '../models/TableColumns';
import type { Token } from '../models/Token';
import type { User } from '../models/User';
import type { UserInDB } from '../models/UserInDB';
import type { UserWithId } from '../models/UserWithId';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Get User
     * @param email
     * @returns UserWithId Successful Response
     * @throws ApiError
     */
    public static getUserAdminUserUserDetailsGet(
        email: string,
    ): CancelablePromise<UserWithId> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/admin/user/user_details',
            query: {
                'email': email,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

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
     * Fields
     * @param _default
     * @param metrics
     * @param dimensions
     * @returns FieldOption Successful Response
     * @throws ApiError
     */
    public static fieldsConnectorGoogleFieldsGet(
        _default: boolean = false,
        metrics: boolean = false,
        dimensions: boolean = false,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/google/fields',
            query: {
                'default': _default,
                'metrics': metrics,
                'dimensions': dimensions,
            },
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
     * Fields
     * @param _default
     * @param metrics
     * @param dimensions
     * @returns FieldOption Successful Response
     * @throws ApiError
     */
    public static fieldsConnectorFacebookFieldsGet(
        _default: boolean = false,
        metrics: boolean = false,
        dimensions: boolean = false,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/facebook/fields',
            query: {
                'default': _default,
                'metrics': metrics,
                'dimensions': dimensions,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deleteConnectorFacebookDeleteGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/facebook/delete',
        });
    }

    /**
     * Deauthorize
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deauthorizeConnectorFacebookDeauthorizeGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/facebook/deauthorize',
        });
    }

    /**
     * Ad Accounts
     * @param token
     * @returns AdAccount Successful Response
     * @throws ApiError
     */
    public static adAccountsConnectorGoogleAnalyticsAdAccountsGet(
        token: string,
    ): CancelablePromise<Array<AdAccount>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/google-analytics/ad_accounts',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Fields
     * @param _default
     * @param metrics
     * @param dimensions
     * @returns FieldOption Successful Response
     * @throws ApiError
     */
    public static fieldsConnectorGoogleAnalyticsFieldsGet(
        _default: boolean = false,
        metrics: boolean = false,
        dimensions: boolean = false,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/google-analytics/fields',
            query: {
                'default': _default,
                'metrics': metrics,
                'dimensions': dimensions,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Table Schema
     * @param schema
     * @param name
     * @returns LookerField Successful Response
     * @throws ApiError
     */
    public static tableSchemaConnectorLookerTableSchemaGet(
        schema: string,
        name: string,
    ): CancelablePromise<Array<LookerField>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/looker/table_schema',
            query: {
                'schema': schema,
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Table Data
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tableDataConnectorLookerTableDataPost(
        requestBody: LookerDataRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/connector/looker/table_data',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create
     * @param requestBody
     * @returns SpreadsheetResponse Successful Response
     * @throws ApiError
     */
    public static createConnectorSheetsCreatePost(
        requestBody: SpreadsheetWithRefreshToken,
    ): CancelablePromise<SpreadsheetResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/connector/sheets/create',
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
     * @param schema
     * @param name
     * @returns CurrentResults Successful Response
     * @throws ApiError
     */
    public static tableResultsQueryTableResultsGet(
        schema: string,
        name: string,
    ): CancelablePromise<CurrentResults> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/table_results',
            query: {
                'schema': schema,
                'name': name,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Add Data Source
     * @param requestBody
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static addDataSourceQueryAddDataSourcePost(
        requestBody: DataSource,
    ): CancelablePromise<SuccessResponse> {
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
     * Field Options
     * @param channel
     * @returns FieldOption Successful Response
     * @throws ApiError
     */
    public static fieldOptionsQueryFieldOptionsGet(
        channel: ChannelType,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/field_options',
            query: {
                'channel': channel,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Din Sql
     * @param question
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static dinSqlQueryDinSqlPost(
        question: string,
        requestBody: Array<DataSourceInDB>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/din_sql',
            query: {
                'question': question,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Schema Links
     * @param question
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static schemaLinksQuerySchemaLinksPost(
        question: string,
        requestBody: Array<DataSourceInDB>,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/schema_links',
            query: {
                'question': question,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Check Ambiguous Columns
     * @param input
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static checkAmbiguousColumnsQueryCheckAmbiguousColumnsPost(
        input: string,
        requestBody: Body_check_ambiguous_columns_query_check_ambiguous_columns_post,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/check_ambiguous_columns',
            query: {
                'input': input,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Save
     * @param requestBody
     * @param conversationId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static saveQueryConversationSavePost(
        requestBody: Conversation,
        conversationId?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/conversation/save',
            query: {
                'conversation_id': conversationId,
            },
            body: requestBody,
            mediaType: 'application/json',
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
        requestBody: UserInDB,
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
     * Update Onboarding Stage
     * @param requestBody
     * @returns User Successful Response
     * @throws ApiError
     */
    public static updateOnboardingStageUserUpdateOnboardingStagePost(
        requestBody: User,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/update_onboarding_stage',
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
