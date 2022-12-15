/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Completion } from '../models/Completion';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Codex
     * @param prompt 
     * @param completion 
     * @returns Completion Code completion response from codex
     * @throws ApiError
     */
    public static codexCodexGet(
prompt: string,
completion?: string,
): CancelablePromise<Completion> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/codex',
            query: {
                'prompt': prompt,
                'completion': completion,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
