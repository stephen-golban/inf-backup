import { useLazyAxios } from '@api/hooks';

const useRatingsModal = () => {
  const [call, { loading }] = useLazyAxios({
    method: 'post',
    url: '/feedback/appreciation',
  });
  return {
    call,
    loading,
  };
};

export { useRatingsModal };
