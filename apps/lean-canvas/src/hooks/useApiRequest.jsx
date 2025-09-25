import { useCallback, useState } from 'react';

function useApiRequest(apiFunction) {
  const [isLoading, setIsLoaing] = useState(false);
  const [error, setError] = useState(null);

  // options: {onSuccess, onError}
  const execute = useCallback(
    async (params, { onSuccess, onError } = {}) => {
      try {
        setIsLoaing(true);
        setError(null);
        const res = await apiFunction(params);
        if (onSuccess) {
          onSuccess(res);
        }
      } catch (err) {
        console.log('err: ', err);
        setError(err.message);
        if (onError) {
          onError();
        }
      } finally {
        setIsLoaing(false);
      }
    },
    [apiFunction]
  );

  return { isLoading, error, execute };
}

export default useApiRequest;
