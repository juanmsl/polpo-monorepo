import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { PiCaretDown } from 'react-icons/pi';

import { useMediaQuery } from '../../../hooks';
import { InfinityScroll } from '../../infinity-scroll';
import { Menu } from '../../modals';
import { Typography } from '../../typography';
import { Controller } from '../controller';
import { Field } from '../field';
import { ControllerGeneratorProps } from '../form.types';

import { Option } from './option';
import { Options } from './options';
import './select.styles.css';
import {
  ControllerGeneratorSelectProps,
  MultiSelectProps,
  MultiValue,
  OptionComponentProps,
  SelectItem,
  SingleSelectProps,
  SingleValue,
  UnControlledSelectProps,
  SelectContextValue,
  ValueComponentProps,
} from './select.types';

const SelectContext = createContext<SelectContextValue<unknown> | null>(null);

export const useSelectContext = <T extends SelectItem>(): SelectContextValue<T> => {
  const context = useContext(SelectContext as React.Context<SelectContextValue<T> | null>);

  if (!context) {
    throw new Error('useSelectContext must be used within a Select component');
  }

  return context;
};

type OptionLabelProps = {
  children: React.ReactNode;
};

const OptionLabel = ({ children }: OptionLabelProps) => {
  const labelComponent = useMemo(() => {
    if (typeof children === 'string') {
      return (
        <Typography noPadding variant='label' nowrap>
          {children}
        </Typography>
      );
    }

    return children;
  }, [children]);

  return <Menu.GroupLabel>{labelComponent}</Menu.GroupLabel>;
};

const DefaultOption = <T extends SelectItem>({ value }: OptionComponentProps<T>) => {
  return (
    <Typography variant='label' nowrap>
      {typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}
    </Typography>
  );
};

const DefaultValue = <T extends SelectItem>({ value, multiselect }: ValueComponentProps<T>) => {
  if (multiselect) {
    return (
      <Typography noPadding nowrap variant='label'>
        {`${value.length} item${value.length === 1 ? '' : 's'} selected`}
      </Typography>
    );
  }

  if (value === null) {
    return null;
  }

  return (
    <Typography noPadding variant='label' nowrap>
      {typeof value === 'string' || typeof value === 'number' ? value : JSON.stringify(value)}
    </Typography>
  );
};

export const Select = <T extends SelectItem>({
  // Select props
  options,
  isEqualComparator,
  searchQueryValue,
  searchQueryPlaceholder,
  onSearchQuery,
  loadMore = () => null,
  isLoading = false,
  hasNextPage = false,
  emptyMessage = 'No options to select',
  multiselect,
  optionComponent: OptionComponent = DefaultOption,
  valueComponent: ValueComponent = DefaultValue,
  maxOptions,
  children,
  // Shared props
  name,
  value,
  setValue,
  onBlur,
  onFocus,
  className = '',
  style = {},
  showClearOption = false,
  height,
  searchQueryStyle,
  searchQueryClassName,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoFocus = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  readOnly = false,
  disabled = false,
  placeholder = '',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  autoComplete = 'off',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isDirty = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isTouched = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  invalid = false,
  error,
  // Field props
  ...fieldProps
}: UnControlledSelectProps<T>) => {
  const modalRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 480px)');
  const id = useMemo(() => crypto.randomUUID(), []);
  const containerRef = useRef<HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openSelect = useCallback(
    (open: boolean) => {
      setIsOpen(open && !disabled);
    },
    [disabled],
  );

  const clearOption = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (multiselect) {
        setValue([]);
      } else {
        setValue(null);
      }
    },
    [multiselect, setValue],
  );

  const valueNonEmpty = useMemo(() => {
    if (multiselect) {
      return value.length > 0;
    } else {
      return Boolean(value);
    }
  }, [multiselect, value]);

  const renderedOptions = useMemo<React.ReactNode>(() => {
    if (!children)
      return options.map((value, key) => (
        <Select.Option value={value} key={key}>
          <OptionComponent value={value} />
        </Select.Option>
      ));

    return children;
  }, [OptionComponent, children, options]);

  return (
    <SelectContext.Provider
      value={
        {
          selectedValue: value,
          setValue,
          multiselect: multiselect ?? false,
          isEqualComparator,
          maxOptions: maxOptions ?? null,
          setIsOpen,
        } as SelectContextValue<unknown>
      }
    >
      <Field id={id} error={error} isFocus={isOpen} ref={containerRef} {...fieldProps}>
        <section
          id={name}
          style={style}
          onBlur={onBlur}
          className={`select ${disabled ? 'disabled' : ''} ${className}`}
        >
          <section
            id={id}
            className={`select-container ${valueNonEmpty && showClearOption ? 'three-columns' : ''}`}
            onClick={() => openSelect(true)}
          >
            <button
              type='button'
              className={`input-button ${(Array.isArray(value) ? value.length > 0 : value) ? '' : 'placeholder'}`}
              aria-haspopup='listbox'
              aria-expanded={isOpen}
              onFocus={e => {
                openSelect(true);

                if (onFocus) onFocus(e);
              }}
            >
              {valueNonEmpty ? (
                <ValueComponent {...(multiselect ? { value, multiselect } : { value: value })} />
              ) : (
                <Typography variant='label' noPadding nowrap>
                  {placeholder}
                </Typography>
              )}
            </button>
            {valueNonEmpty && showClearOption && (
              <section className='icon-close' onClick={clearOption}>
                <ImCross />
              </section>
            )}
            <PiCaretDown className={`select-caret-icon ${isOpen && 'is-select-open'}`} />
          </section>
          <Menu
            id='form-select'
            isOpen={isOpen}
            onClose={() => openSelect(false)}
            backdrop={isMobile ? 'blur' : 'transparent'}
            opacity={isMobile ? 0.8 : 0.4}
            position={isMobile ? 'center' : 'bottom'}
            offset={5}
            modalRef={modalRef}
            windowOffset={10}
            transitionDuration={200}
            containerRef={isMobile ? undefined : containerRef}
            contentClassName='select-menu-content'
            className='select-options-menu'
          >
            <Options
              containerRef={containerRef}
              onSearchQuery={onSearchQuery}
              searchQueryValue={searchQueryValue}
              searchQueryPlaceholder={searchQueryPlaceholder}
              searchQueryClassName={searchQueryClassName}
              searchQueryStyle={searchQueryStyle}
              height={height}
            >
              <InfinityScroll
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                loadMore={loadMore}
                emptyMessage={emptyMessage}
              >
                {renderedOptions}
              </InfinityScroll>
            </Options>
          </Menu>
        </section>
      </Field>
    </SelectContext.Provider>
  );
};

const MultiSelectController = <T extends SelectItem>({
  rules,
  ...props
}: ControllerGeneratorProps<MultiSelectProps<T>, MultiValue<T>>) => {
  return (
    <Controller<MultiSelectProps<T>, MultiValue<T>>
      Component={Select}
      defaultValue={[]}
      inputProps={{
        ...props,
        multiselect: true,
      }}
      rules={rules}
    />
  );
};

const SingleSelectController = <T extends SelectItem>({
  rules,
  ...props
}: ControllerGeneratorProps<SingleSelectProps<T>, SingleValue<T>>) => {
  return (
    <Controller<SingleSelectProps<T>, SingleValue<T>>
      Component={Select}
      defaultValue={null}
      inputProps={{
        ...props,
        multiselect: false,
      }}
      rules={rules}
    />
  );
};

const SelectController = <T extends SelectItem>(props: ControllerGeneratorSelectProps<T>) => {
  const { multiselect } = props;

  if (multiselect) {
    return <MultiSelectController<T> {...props} multiselect={true} />;
  }

  return <SingleSelectController<T> {...props} multiselect={false} />;
};

Select.Controller = SelectController;
Select.Option = Option;
Select.OptionLabel = OptionLabel;
