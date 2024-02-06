/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LLMConfig } from './LLMConfig';
export type SQLGenerationRequest = {
    finetuning_id?: string;
    low_latency_mode?: boolean;
    llm_config?: LLMConfig;
    evaluate?: boolean;
    sql?: string;
    metadata?: Record<string, any>;
};

