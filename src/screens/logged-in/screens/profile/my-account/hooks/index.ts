import { useGetSubscription } from '@services/subscription';

const useMyAccountScreen = () => {
  const mySubscription = useGetSubscription(true);

  const loading = mySubscription.loading;

  // const nextPaymentDate = mySubscription.subscription?.subscriptionAccounts?.[0]?.termDateTime;
  // const subscriptionName = mySubscription.subscription?.title;
  // const subscriptionPrice = mySubscription.subscription?.price;
  // const subscriptionDuration = mySubscription.subscription?.subscriptionDuration;
  // const subscriptionId = mySubscription.subscription?.id;

  async function refetch() {
    await mySubscription.getSubscription();
  }

  return {
    loading,
    refetch,
  };
};

export default useMyAccountScreen;
