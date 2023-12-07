/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OnboardingStage } from './OnboardingStage';

export type UserInDB = {
    email: string;
    onboarding_stage?: OnboardingStage;
    facebook_access_token?: string;
    google_refresh_token?: string;
    google_analytics_refresh_token?: string;
    google_sheets_refresh_token?: string;
    hashed_password: string;
};

