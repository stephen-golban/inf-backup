import axios from 'axios';
import { useState } from 'react';

export default () => {
  const [source, setSource] = useState(axios.CancelToken.source());

  const cancel = () => {
    source.cancel('Operation canceled by the user.');
    setSource(axios.CancelToken.source());
  };

  return { cancel, cancelToken: source.token };
};
