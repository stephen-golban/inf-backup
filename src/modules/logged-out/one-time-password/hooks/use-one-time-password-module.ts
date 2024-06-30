import { OneTimePasswordFormFields } from '../resolver';

const DEFAULT_VALUES: OneTimePasswordFormFields = {
  code: '',
};

function useOneTimePasswordModule() {
  return { DEFAULT_VALUES };
}
export { useOneTimePasswordModule };
