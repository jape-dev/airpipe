/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdAccount } from './AdAccount';
import type { FieldOption } from './FieldOption';
import type { User } from './User';
export type DataSource = {
    name: string;
    user: User;
    fields: Array<FieldOption>;
    adAccounts: Array<AdAccount>;
    start_date: string;
    end_date: string;
};

