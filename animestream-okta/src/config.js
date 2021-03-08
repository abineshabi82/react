const oktaAuthConfig = {
  // Note: If your app is configured to use the Implicit Flow
  // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
  // you will need to add `pkce: false`
  issuer: "https://dev-56048263.okta.com/oauth2/default",
  clientId: "0oaapn6n49Vaos7RE5d6",
  redirectUri: window.location.origin + "/implicit/callback",
  pkce: false
};

const oktaSignInConfig = {
  baseUrl: "https://dev-56048263.okta.com",
  clientId: "0oaapn6n49Vaos7RE5d6",
  redirectUri: window.location.origin + "/implicit/callback",
  authParams: {
    // If your app is configured to use the Implicit Flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to uncomment the below line
    pkce: false
  }
};

export { oktaAuthConfig, oktaSignInConfig };
