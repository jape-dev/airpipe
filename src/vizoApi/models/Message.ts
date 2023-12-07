/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Message = {
    is_user_message: boolean;
    current_user?: User;
    text?: string;
    data?: Array<any>;
    columns?: Array<string>;
    loading?: boolean;
    table_name?: string;
};

