import { auth_api, reset_password_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';

import { DEV_CLIENT_ID, DEV_CLIENT_SECRET, DEV_RESET_PASSWORD_CID, DEV_RESET_PASSWORD_CSECR } from '@env';

import { TokensApiResponse } from '@typings/responses/tokens';

const queryParams = {
  grant_type: 'password',
  username: DEV_CLIENT_ID,
  password: DEV_CLIENT_SECRET,
};
const queryResetPasswordParams = {
  grant_type: 'password',
  username: DEV_RESET_PASSWORD_CID,
  password: DEV_RESET_PASSWORD_CSECR,
};

const useTokenService = (isResetPassword = false) => {
  const [call, { loading, data }] = useLazyAxios<TokensApiResponse>({
    method: 'post',
    axiosInstance: isResetPassword ? reset_password_api : auth_api,
    url: '/auth/oauth/token',
  });

  const getTokens = useTryCatch(async () => await call(isResetPassword ? queryResetPasswordParams : queryParams));

  return {
    data,
    loading,
    getTokens,
  };
};

export { useTokenService };
