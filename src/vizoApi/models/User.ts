/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { OnboardingStage } from './OnboardingStage';

export type User = {
    email: string;
    hashed_password: string;
    onboarding_stage?: OnboardingStage;
    facebook_access_token?: string;
    google_access_token?: string;
    google_analytics_access_token?: string;
};

