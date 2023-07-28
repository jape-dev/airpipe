/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelType } from './ChannelType';

export type AdAccount = {
    id: string;
    channel: ChannelType;
    account_id?: string;
    name?: string;
    img?: string;
};

