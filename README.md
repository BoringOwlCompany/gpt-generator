# Plugin config

```
config: {
  multiple: {
    articles: boolean,
    flashcards: boolean,
  },
  single: boolean,
  calendar: boolean,
  socialMediaPublisher: boolean,
},
```

# Required envs

GPT_API_KEY = Api key for your openai account

# Social Media Publisher

## Twitter

### Creating App

1. Login to your twitter account and go to https://developer.twitter.com/en/portal/dashboard
2. click "Sign up for Free Account" and follow form
3. Set up "User authentication settings" on created project settings page

```
App permissions: Read and write
Type of App: Web App, Automated App or Bot
Redirect URL: http://localhost:3000
Website URL: Your website url
```

4. Note your Client ID and Client Secret

### Required envs

TWITTER_CLIENT_ID = Client ID <br />
TWITTER_CLIENT_SECRET = Client Secret <br />

### How to get refresh token

1. Get code and code_verifier from GET
   https://twitter.com/i/oauth2/authorize?response_type=code&client_id=CLIENT_ID&redirect_uri=http://localhost:3000&scope=offline.access%20tweet.read%20tweet.write%20users.read&state=state&code_challenge=code_challenge&code_challenge_method=plain
2. Get refresh token from POST https://api.twitter.com/2/oauth2/token

```
{
  code,
  code_verifier,
  client_id,
  client_secret,
  redirect_uri: 'http://localhost:3000',
  grant_type: 'authorization_code'
}
```

## Linkedin

### Creating App

1. Login to your Linkedin account and go to https://www.linkedin.com/developers/apps
2. Click "Create app" and fill up the form
3. On "Auth" tab fill up authorized redirect URLs with http://localhost:3000
4. Note your Client ID and Client Secret

### Required envs

LINKEDIN_CLIENT_ID = Client ID <br />
LINKEDIN_CLIENT_SECRET = Client Secret <br />

### How to get access token

1. Go to https://www.linkedin.com/developers/tools/oauth/token-generator?clientId=CLIENT_ID
2. Select w_member_social r_emailaddress r_liteprofile scopes, request access token and log in to your account
3. Copy access token
