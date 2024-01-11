/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CurrentResults } from './CurrentResults';
import type { FieldOption } from './FieldOption';
export type ChartData = {
    chart_id: string;
    data: CurrentResults;
    chart_type: string;
    selected_dimension: FieldOption;
    selected_metric: FieldOption;
    primary_color: string;
    secondary_color: string;
    slice_colors: Array<string>;
    field_options: Array<FieldOption>;
    title: string;
    caption: string;
};

