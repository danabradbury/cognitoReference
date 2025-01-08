import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
              authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_XvvGolH0y',
              redirectUrl: window.location.origin + '/auth-callback',
              postLogoutRedirectUri: window.location.origin,
              clientId: '61food7rnfk6501lg535p182it',
              scope: 'phone openid email',
              responseType: 'code',
              silentRenew: true,
              useRefreshToken: true,
              renewTimeBeforeTokenExpiresInSeconds: 30,
          }
}
