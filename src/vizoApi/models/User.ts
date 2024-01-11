/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { OnboardingStage } from './OnboardingStage';
import type { UserRoleType } from './UserRoleType';
export type User = {
    email: string;
    onboarding_stage?: OnboardingStage;
    role?: UserRoleType;
    facebook_access_token?: string;
    google_refresh_token?: string;
    google_analytics_refresh_token?: string;
    google_sheets_refresh_token?: string;
    youtube_refresh_token?: string;
    instagram_access_token?: string;
};

