/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LLMConfig } from './LLMConfig';
import type { PromptRequest } from './PromptRequest';
export type PromptSQLGenerationRequest = {
    finetuning_id?: string;
    low_latency_mode?: boolean;
    llm_config?: LLMConfig;
    evaluate?: boolean;
    sql?: string;
    metadata?: Record<string, any>;
    prompt: PromptRequest;
};

