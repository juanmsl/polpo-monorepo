import React, { useCallback, useState } from 'react';

type InputTypes = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

type UseInputHandlersProps<T extends InputTypes> = {
  onBlur?: (e: React.FocusEvent<T>) => void;
  onFocus?: (e: React.FocusEvent<T>) => void;
  onChange?: (e: React.ChangeEvent<T>) => void;
};

export const useInputHandlers = <T extends InputTypes>({
  onBlur,
  onFocus,
  onChange,
}: UseInputHandlersProps<T> = {}) => {
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = useCallback(
    (e: React.FocusEvent<T>) => {
      setIsFocus(true);
      onFocus && onFocus(e);
    },
    [onFocus],
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<T>) => {
      setIsFocus(false);
      onBlur && onBlur(e);
    },
    [onBlur],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<T>) => {
      onChange && onChange(e);
    },
    [onChange],
  );

  return {
    isFocus,
    handlers: {
      onFocus: handleFocus,
      onBlur: handleBlur,
      onChange: handleChange,
    },
  };
};
