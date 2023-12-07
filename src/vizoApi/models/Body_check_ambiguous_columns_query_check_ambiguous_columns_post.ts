/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { AmbiguousColumns } from './AmbiguousColumns';
import type { BaseAmbiguities } from './BaseAmbiguities';
import type { DataSourceInDB } from './DataSourceInDB';

export type Body_check_ambiguous_columns_query_check_ambiguous_columns_post = {
    data_sources: Array<DataSourceInDB>;
    ambiguities?: (AmbiguousColumns | BaseAmbiguities);
};

