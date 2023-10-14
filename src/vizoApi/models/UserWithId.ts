/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OnboardingStage } from './OnboardingStage';

export type UserWithId = {
    email: string;
    onboarding_stage?: OnboardingStage;
    facebook_access_token?: string;
    google_refresh_token?: string;
    google_analytics_refresh_token?: string;
    google_sheets_refresh_token?: string;
    id: number;
};

