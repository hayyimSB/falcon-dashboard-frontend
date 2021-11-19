import { useEffect, useState } from 'react';

const useMount = (callback: () => void) => {
  const [data] = useState(void 0);

  useEffect(() => {
    callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [true]);

  return data;
};

export default useMount;
