/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LLMConfig } from './LLMConfig';
export type NLGenerationResponse = {
    id: string;
    metadata?: Record<string, any>;
    created_at?: string;
    llm_config?: LLMConfig;
    sql_generation_id: string;
    text?: string;
};

