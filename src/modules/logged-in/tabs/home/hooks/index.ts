import useCreditScore from './use-credit-score';
import useCreditReport from './use-credit-report';

function useHomeModule() {
  const { score, fetchScore, loading: scoreLoading } = useCreditScore();
  const report = useCreditReport();

  async function refetch() {
    await Promise.all([fetchScore(), report.refetch()]);
  }

  return {
    score,
    fetchScore,
    scoreLoading,
    report,
    refetch,
  };
}

export default useHomeModule;
