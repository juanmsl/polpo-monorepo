import React, { useCallback, useMemo } from 'react';

import { Menu } from '../../modals';
import { Typography } from '../../typography';

import { useSelectContext } from './select.component';
import { SelectItem } from './select.types';

type OptionProps<T extends SelectItem> = {
  children: React.ReactNode;
  value: T;
};

export const Option = <T extends SelectItem>({ children, value }: OptionProps<T>) => {
  const { multiselect, isEqualComparator, maxOptions, selectedValue, setValue, setIsOpen } = useSelectContext<T>();

  const compareValuesIsEqual = useCallback(
    (a: T, b: T): boolean => {
      if (['number', 'string'].includes(typeof a)) {
        return a === b;
      }

      return !!isEqualComparator && isEqualComparator(a, b);
    },
    [isEqualComparator],
  );

  const toggleOption = useCallback(
    (isSelected: boolean) => {
      if (isSelected) {
        if (multiselect) {
          if (maxOptions && Array.isArray(selectedValue) && selectedValue.length >= maxOptions) {
            return;
          }

          setValue([...selectedValue, value]);
        } else {
          setValue(value);
          setIsOpen(false);
        }
      } else {
        if (multiselect) {
          setValue(selectedValue.filter(item => !compareValuesIsEqual(item, value)));
        } else {
          setValue(null);
          setIsOpen(false);
        }
      }
    },
    [multiselect, maxOptions, selectedValue, setValue, value, setIsOpen, compareValuesIsEqual],
  );

  const isSelected = useMemo(() => {
    if (selectedValue === '' || selectedValue === null) {
      return false;
    }

    if (!Array.isArray(selectedValue)) {
      return compareValuesIsEqual(value, selectedValue);
    }

    if (['number', 'string'].includes(typeof value)) {
      return selectedValue.includes(value);
    }

    return selectedValue.some(item => !!isEqualComparator && isEqualComparator(value, item));
  }, [compareValuesIsEqual, isEqualComparator, selectedValue, value]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (['Enter', ' '].includes(e.key)) {
        e.preventDefault();

        toggleOption(!(isSelected && multiselect));
      }
    },
    [toggleOption, isSelected, multiselect],
  );

  const optionLabel = useMemo(() => {
    if (typeof children === 'string') {
      return (
        <Typography data-value={value} variant='label' nowrap>
          {children}
        </Typography>
      );
    }

    return children;
  }, [children, value]);

  return (
    <Menu.Option
      label={optionLabel}
      onKeyDown={handleKeyDown}
      asCheckbox={multiselect}
      selected={isSelected}
      onClick={(selected: boolean) => toggleOption(multiselect ? selected : true)}
    />
  );
};
