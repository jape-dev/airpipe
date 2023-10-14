/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldType } from './FieldType';
import type { LookerFieldType } from './LookerFieldType';

export type LookerField = {
    id: string;
    name: string;
    looker_field_type: LookerFieldType;
    field_type: FieldType;
};

