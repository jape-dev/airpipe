/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type GoogleAnalyticsQuery = {
  property_id: string;
  metrics: Array<string>;
  dimensions: Array<string>;
  start_date: string;
  end_date: string;
};
