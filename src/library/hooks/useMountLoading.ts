import { useState } from 'react';
import { useMount } from 'react-use';
import { sleep } from '@library/method';

export default function useMountLoading() {
  const [mountLoading, setMountLoading] = useState(true);

  useMount(async () => {
    await sleep(100);
    setMountLoading(false);
  });

  return mountLoading;
}
