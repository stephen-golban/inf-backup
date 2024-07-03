import { auth_api } from '@api/base';
import { useLazyAxios } from '@api/hooks';
import { useTryCatch } from '@library/hooks';

import { DEV_CLIENT_ID, DEV_CLIENT_SECRET } from '@env';

import { TokensApiResponse } from '@typings/responses/tokens';

const queryParams = {
  grant_type: 'password',
  username: DEV_CLIENT_ID,
  password: DEV_CLIENT_SECRET,
};

const useTokenService = () => {
  const [call, { loading, data }] = useLazyAxios<TokensApiResponse>({
    method: 'post',
    axiosInstance: auth_api,
    url: '/auth/oauth/token',
  });

  const getTokens = useTryCatch(async () => await call(queryParams));

  return {
    data,
    loading,
    getTokens,
  };
};

export { useTokenService };
