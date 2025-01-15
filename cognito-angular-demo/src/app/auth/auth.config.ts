import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
              authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XvvGolH0y',
              redirectUrl: 'http://localhost:4200/auth-callback',
              postLogoutRedirectUri: 'http://localhost:4200',
              clientId: '61food7rnfk6501lg535p182it',
              scope: 'profile openid email',
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
          }
}
