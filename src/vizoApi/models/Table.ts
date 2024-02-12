/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChannelType } from './ChannelType';
export type Table = {
    id: number;
    user_id: string;
    db_schema: string;
    name: string;
    table_name: string;
    label: string;
    fields: string;
    start_date: string;
    end_date: string;
    channel?: ChannelType;
    channel_img?: string;
    ad_account_id?: string;
    dh_connection_id?: string;
};

