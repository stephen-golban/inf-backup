import useCreditScore from './use-credit-score';
import useCreditReport from './use-credit-report';

function useHomeModule() {
  const score = useCreditScore();
  const report = useCreditReport();

  async function refetch() {
    await score.refetch();
    await report.refetch();
  }

  return {
    score,
    report,
    refetch,
  };
}

export default useHomeModule;
