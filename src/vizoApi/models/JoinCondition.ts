/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldOption } from './FieldOption';
import type { JoinType } from './JoinType';

export type JoinCondition = {
    left_field: FieldOption;
    right_field: FieldOption;
    join_type: JoinType;
    left_data_source_id: number;
    right_data_source_id: number;
};

