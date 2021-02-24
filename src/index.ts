import axios from 'axios';
import * as dotenv from 'dotenv';

// init dotenv
dotenv.config();

const cognitoIssuer : string = 'https://cognito-idp.{region}.amazonaws.com/{userPoolId}/.well-known/jwks.json';
// const cognitoClaim : string = 'https://cognito-idp.us-east-1.amazonaws.com/<userpoolID>';

/**
 * Get Public Keys Default
 */
export const getPublicKeys = async () => {
    try {
        const request = await axios.get(cognitoIssuer);
        const { data: response } = request;

        return response;
    } catch (e) {
        throw e;
    }
}

/**
 * Validate AWS Cognito Token
 * 
 * @param token string
 */
export const validate = (token: String) => {
    return token;
}