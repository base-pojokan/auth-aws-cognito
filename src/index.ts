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
    email: string,
    sub: string,
    groups: string[] | string | null,
    phone_number: string | null,
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
        if(!userGroup) {
            throw new Error('the user does not have a group.!');
        }

        // validate group
        if(!userGroup.includes(group)) {
            throw new Error(`the user does not have a ${group} group`);
        }

        // get user detail
        const userDetail : UserDetail = {
            email: String(context?.authorizer?.claims['email']),
            sub: String(context?.authorizer?.claims['sub']),
            groups: context?.authorizer?.claims['cognito:groups'],
            phone_number: String(context?.authorizer?.claims['phone_number'])
        }

        // return user group
        return userDetail;
    } catch (e) {
        throw new Error(e.message);
    }
}
