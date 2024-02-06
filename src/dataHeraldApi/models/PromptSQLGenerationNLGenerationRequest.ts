/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LLMConfig } from './LLMConfig';
import type { PromptSQLGenerationRequest } from './PromptSQLGenerationRequest';
export type PromptSQLGenerationNLGenerationRequest = {
    llm_config?: LLMConfig;
    max_rows?: number;
    metadata?: Record<string, any>;
    sql_generation: PromptSQLGenerationRequest;
};

