/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DataSourceInDB } from './DataSourceInDB';
import type { FieldOptionWithDataSourceId } from './FieldOptionWithDataSourceId';
import type { JoinCondition } from './JoinCondition';

export type Body_create_blend_query_create_blend_post = {
    fields: Array<FieldOptionWithDataSourceId>;
    join_conditions: Array<JoinCondition>;
    left_data_source: DataSourceInDB;
    right_data_source: DataSourceInDB;
};

