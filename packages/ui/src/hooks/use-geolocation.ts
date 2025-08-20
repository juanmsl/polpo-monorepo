import { useEffect, useRef, useState } from 'react';

type GeolocationData = GeolocationPosition['coords'] & {
  timestamp: GeolocationPosition['timestamp'];
};

interface GeolocationError {
  code: number;
  message: string;
}

type UseGeolocationReturn = {
  data: GeolocationData | null;
  error: GeolocationError | null;
  isLoading: boolean;
};

export const useGeolocation = (): UseGeolocationReturn => {
  const [data, setData] = useState<GeolocationData | null>(null);
  const [error, setError] = useState<GeolocationError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const watchIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by your browser.',
      });
      setIsLoading(false);

      return;
    }

    const handleSuccess = (position: GeolocationPosition) => {
      setData({
        ...position.coords,
        timestamp: position.timestamp,
      });
      setIsLoading(false);
    };

    const handleError = (geolocationError: GeolocationPositionError) => {
      setError({
        code: geolocationError.code,
        message: geolocationError.message,
      });
      setIsLoading(false);
    };

    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);

    watchIdRef.current = navigator.geolocation.watchPosition(handleSuccess, handleError);

    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  return { data, error, isLoading };
};
