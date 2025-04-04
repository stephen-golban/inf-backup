export type LoginApiResponse = {
  scope: string;
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
};
