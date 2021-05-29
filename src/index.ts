import { Request } from 'express';

export interface ClaimsData {
    [key: string]: string[] | string | null;
}

export interface Claims {
    claims: ClaimsData
}

export interface RequestContext {
    authorizer: Claims
}

export interface RequestAuthenticated extends Request {
    context: RequestContext
}

export interface UserDetail {
    name: string,
    email: string,
    email_verified: boolean,
    sub: string,
    username: string,
    groups: string[] | string | null,
    phone_number: string | null,
    picture: string | null,
}

/**
 * Validate AWS Cognito Group
 * 
 * @param req RequestAuthenticated
 * @param group string
 * @returns UserDetail
 */
export const validateGroup = async (req: RequestAuthenticated, group: string) => {
    try {
        // get context from request header
        const { context } = req;

        // get user group from cognito
        const userGroup = context?.authorizer?.claims['cognito:groups'];

        // throw error if group not found
        if (!userGroup) {
            throw new Error('the user does not have a group.!');
        }

        // validate group
        if (!userGroup.includes(group)) {
            throw new Error(`the user does not have a ${group} group`);
        }

        // get user detail
        const user = userDetail(req);

        // return user group
        return user;
    } catch (e) {
        throw e;
    }
}

/**
 * Get User Detail From Header
 */
export const userDetail = (req: RequestAuthenticated) => {
    const { context } = req;

    const data: UserDetail = {
        name: String(context?.authorizer?.claims['name']),
        email: String(context?.authorizer?.claims['email']),
        email_verified: Boolean(context?.authorizer?.claims['email_verified']),
        sub: String(context?.authorizer?.claims['cognito:username']),
        username: String(context?.authorizer?.claims['cognito:username']),
        groups: context?.authorizer?.claims['cognito:groups'],
        phone_number: String(context?.authorizer?.claims['phone_number']),
        picture: String(context?.authorizer?.claims['picture']),
    }

    return data;
}