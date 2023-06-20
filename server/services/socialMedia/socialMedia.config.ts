export const LINKEDIN_BASE_URL = 'https://api.linkedin.com';
export const LINKEDIN_VALIDATE_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/introspectToken';
export const LINKEDIN_REFRESH_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';

export enum LINKEDIN_ROUTES {
  POSTS = '/v2/posts',
  ME = '/v2/me',
  FILE_UPLOAD = '/rest/images?action=initializeUpload',
}
