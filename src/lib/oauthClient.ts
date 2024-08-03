import { google } from 'googleapis';

export async function oauthClient() {
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  const OAuth2 = google.auth.OAuth2;

  const oauth2Client = new OAuth2(
    clientId,
    clientSecret,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const accessToken = await new Promise<string>((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err || !token) {
        console.error('Error getting access token:', err);
        reject('Failed to get access token');
      }
      resolve(token as string);
    });
  });

  return { accessToken, refreshToken, clientId, clientSecret };
}
