/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdAccount } from '../models/AdAccount';
import type { Body_check_ambiguous_columns_query_check_ambiguous_columns_post } from '../models/Body_check_ambiguous_columns_query_check_ambiguous_columns_post';
import type { Body_create_blend_query_create_blend_post } from '../models/Body_create_blend_query_create_blend_post';
import type { Body_field_options_query_field_options_post } from '../models/Body_field_options_query_field_options_post';
import type { Body_login_for_access_token_user_auth_token_post } from '../models/Body_login_for_access_token_user_auth_token_post';
import type { CaptionData } from '../models/CaptionData';
import type { ChannelType } from '../models/ChannelType';
import type { ChartData } from '../models/ChartData';
import type { Conversation } from '../models/Conversation';
import type { CurrentResults } from '../models/CurrentResults';
import type { DataSource } from '../models/DataSource';
import type { DataSourceInDB } from '../models/DataSourceInDB';
import type { FieldOption } from '../models/FieldOption';
import type { LookerDataRequest } from '../models/LookerDataRequest';
import type { LookerField } from '../models/LookerField';
import type { LookerTable } from '../models/LookerTable';
import type { QueryResults } from '../models/QueryResults';
import type { SpreadsheetResponse } from '../models/SpreadsheetResponse';
import type { SpreadsheetWithRefreshToken } from '../models/SpreadsheetWithRefreshToken';
import type { SuccessResponse } from '../models/SuccessResponse';
import type { Table } from '../models/Table';
import type { TableColumns } from '../models/TableColumns';
import type { Token } from '../models/Token';
import type { User } from '../models/User';
import type { UserInDB } from '../models/UserInDB';
import type { UserWithId } from '../models/UserWithId';
import type { View } from '../models/View';
import type { ViewInDB } from '../models/ViewInDB';

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
     * Tables
     * @param email
     * @param token
     * @returns LookerTable Successful Response
     * @throws ApiError
     */
    public static tablesConnectorLookerTablesGet(
        email: string,
        token: string,
    ): CancelablePromise<Array<LookerTable>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/looker/tables',
            query: {
                'email': email,
                'token': token,
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
     * @param token
     * @returns LookerField Successful Response
     * @throws ApiError
     */
    public static tableSchemaConnectorLookerTableSchemaGet(
        schema: string,
        name: string,
        token: string,
    ): CancelablePromise<Array<LookerField>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/looker/table_schema',
            query: {
                'schema': schema,
                'name': name,
                'token': token,
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
     * Ad Accounts
     * @param token
     * @returns AdAccount Successful Response
     * @throws ApiError
     */
    public static adAccountsConnectorYoutubeAdAccountsGet(
        token: string,
    ): CancelablePromise<Array<AdAccount>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/youtube/ad_accounts',
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
    public static fieldsConnectorYoutubeFieldsGet(
        _default: boolean = false,
        metrics: boolean = false,
        dimensions: boolean = false,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/youtube/fields',
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
    public static loginConnectorInstagramLoginGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/instagram/login',
        });
    }

    /**
     * Ad Accounts
     * @param token
     * @returns AdAccount Successful Response
     * @throws ApiError
     */
    public static adAccountsConnectorInstagramAdAccountsGet(
        token: string,
    ): CancelablePromise<Array<AdAccount>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/instagram/ad_accounts',
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
    public static fieldsConnectorInstagramFieldsGet(
        _default: boolean = false,
        metrics: boolean = false,
        dimensions: boolean = false,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/instagram/fields',
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
    public static deleteConnectorInstagramDeleteGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/instagram/delete',
        });
    }

    /**
     * Deauthorize
     * @returns any Successful Response
     * @throws ApiError
     */
    public static deauthorizeConnectorInstagramDeauthorizeGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/connector/instagram/deauthorize',
        });
    }

    /**
     * Get Table Columns
     * @param token
     * @param tableName
     * @returns TableColumns Successful Response
     * @throws ApiError
     */
    public static getTableColumnsQueryTableColumnsGet(
        token: string,
        tableName: string,
    ): CancelablePromise<TableColumns> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/table_columns',
            query: {
                'token': token,
                'table_name': tableName,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Data Source Field Options
     * @param requestBody
     * @returns FieldOption Successful Response
     * @throws ApiError
     */
    public static dataSourceFieldOptionsQueryDataSourceFieldOptionsPost(
        requestBody: DataSourceInDB,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/data_source_field_options',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Field Options
     * @param requestBody
     * @returns FieldOption Successful Response
     * @throws ApiError
     */
    public static fieldOptionsQueryFieldOptionsPost(
        requestBody: Body_field_options_query_field_options_post,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/field_options',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Channel Field Options
     * @param channel
     * @param token
     * @returns FieldOption Successful Response
     * @throws ApiError
     */
    public static channelFieldOptionsQueryChannelFieldOptionsGet(
        channel: ChannelType,
        token: string,
    ): CancelablePromise<Array<FieldOption>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/channel_field_options',
            query: {
                'channel': channel,
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
     * @param query
     * @returns QueryResults Successful Response
     * @throws ApiError
     */
    public static runQueryQueryRunQueryGet(
        token: string,
        query: string,
    ): CancelablePromise<QueryResults> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/run_query',
            query: {
                'token': token,
                'query': query,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Table Results
     * @param token
     * @param schema
     * @param name
     * @param dateColumn
     * @param startDate
     * @param endDate
     * @returns CurrentResults Successful Response
     * @throws ApiError
     */
    public static tableResultsQueryTableResultsGet(
        token: string,
        schema: string,
        name: string,
        dateColumn?: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<CurrentResults> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/table_results',
            query: {
                'token': token,
                'schema': schema,
                'name': name,
                'date_column': dateColumn,
                'start_date': startDate,
                'end_date': endDate,
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
     * @param token
     * @returns DataSourceInDB Successful Response
     * @throws ApiError
     */
    public static dataSourcesQueryDataSourcesGet(
        token: string,
    ): CancelablePromise<Array<DataSourceInDB>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/data_sources',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Views
     * @param token
     * @returns ViewInDB Successful Response
     * @throws ApiError
     */
    public static viewsQueryViewsGet(
        token: string,
    ): CancelablePromise<Array<ViewInDB>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/views',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Tables
     * @param token
     * @returns Table Successful Response
     * @throws ApiError
     */
    public static tablesQueryTablesGet(
        token: string,
    ): CancelablePromise<Array<Table>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/tables',
            query: {
                'token': token,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Blend
     * @param token
     * @param requestBody
     * @param dateColumn
     * @param startDate
     * @param endDate
     * @returns QueryResults Successful Response
     * @throws ApiError
     */
    public static createBlendQueryCreateBlendPost(
        token: string,
        requestBody: Body_create_blend_query_create_blend_post,
        dateColumn?: string,
        startDate?: string,
        endDate?: string,
    ): CancelablePromise<QueryResults> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/create_blend',
            query: {
                'token': token,
                'date_column': dateColumn,
                'start_date': startDate,
                'end_date': endDate,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Save View
     * @param token
     * @param requestBody
     * @returns ViewInDB Successful Response
     * @throws ApiError
     */
    public static saveViewQuerySaveViewPost(
        token: string,
        requestBody: View,
    ): CancelablePromise<ViewInDB> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/save_view',
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
     * Save Table
     * @param token
     * @param schema
     * @param requestBody
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static saveTableQuerySaveTablePost(
        token: string,
        schema: string,
        requestBody: CurrentResults,
    ): CancelablePromise<SuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/save_table',
            query: {
                'token': token,
                'schema': schema,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Chart Data
     * @param chartId
     * @returns ChartData Successful Response
     * @throws ApiError
     */
    public static chartDataQueryChartDataGet(
        chartId: string,
    ): CancelablePromise<ChartData> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/query/chart_data',
            query: {
                'chart_id': chartId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Save Chart
     * @param token
     * @param requestBody
     * @returns SuccessResponse Successful Response
     * @throws ApiError
     */
    public static saveChartQuerySaveChartPost(
        token: string,
        requestBody: ChartData,
    ): CancelablePromise<SuccessResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/save_chart',
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
     * Chart Insights
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static chartInsightsQueryChartInsightsPost(
        requestBody: CaptionData,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/chart_insights',
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
     * Connect Db
     * @param dbSchema
     * @param useSsh
     * @param alias
     * @returns any Successful Response
     * @throws ApiError
     */
    public static connectDbQueryDataheraldConnectDbPost(
        dbSchema: string,
        useSsh: boolean = false,
        alias: string = 'airpipe_db',
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/query/dataherald/connect_db',
            query: {
                'db_schema': dbSchema,
                'use_ssh': useSsh,
                'alias': alias,
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
     * Clear Access Token
     * @param token
     * @param channel
     * @returns User Successful Response
     * @throws ApiError
     */
    public static clearAccessTokenUserClearAccessTokenPost(
        token: string,
        channel: ChannelType,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/clear_access_token',
            query: {
                'token': token,
                'channel': channel,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * User
     * @param token
     * @returns UserWithId Successful Response
     * @throws ApiError
     */
    public static userUserUserGet(
        token: string,
    ): CancelablePromise<UserWithId> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/user',
            query: {
                'token': token,
            },
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
