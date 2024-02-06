/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Base class for settings, allowing values to be overridden by environment variables.
 *
 * This is useful in production for secrets you do not wish to save in code, it plays nicely with docker(-compose),
 * Heroku and any 12 factor app design.
 */
export type SSHSettings = {
    host?: string;
    username?: string;
    password?: string;
    port?: string;
    private_key_password?: string;
};

