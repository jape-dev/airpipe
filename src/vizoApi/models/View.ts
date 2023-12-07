/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FieldOption } from './FieldOption';
import type { JoinCondition } from './JoinCondition';

export type View = {
    name: string;
    fields: Array<FieldOption>;
    start_date: string;
    end_date: string;
    join_conditions?: Array<JoinCondition>;
};

