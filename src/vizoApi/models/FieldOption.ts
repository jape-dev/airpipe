/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ChannelType } from './ChannelType';
import type { FieldType } from './FieldType';

export type FieldOption = {
    value: string;
    label: string;
    type: FieldType;
    channel: ChannelType;
    alt_value?: string;
    img?: string;
};

