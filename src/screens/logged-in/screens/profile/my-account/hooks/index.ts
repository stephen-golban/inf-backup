import { useGetSubscription } from '@services/subscription';

const useMyAccountScreen = () => {
  const mySubscription = useGetSubscription(true);

  const loading = mySubscription.loading;

  async function refetch() {
    await mySubscription.getSubscription();
  }

  return {
    loading,
    refetch,
  };
};

export default useMyAccountScreen;
