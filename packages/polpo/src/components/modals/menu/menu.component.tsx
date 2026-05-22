import React, { RefObject, useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';

import { useClassNames } from '../../../hooks';
import { Checkbox } from '../../form';
import { Line } from '../../line';
import { Ripple } from '../../ripple';
import { Typography, TypographyProps } from '../../typography';
import { Modal, ModalProps } from '../modal';

import './menu.styles.css';

type MenuProps = ModalProps & {
  children: React.ReactNode;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  menuContentRef?: RefObject<HTMLUListElement>;
};

export const Menu = ({
  children,
  isOpen,
  onClose,
  id,
  menuContentRef,
  contentClassName = '',
  contentStyle = {},
  className = '',
  ...modalProps
}: MenuProps) => {
  const modalClassName = useClassNames({
    'menu-modal': true,
    [className]: Boolean(className),
  });

  return (
    <Modal className={modalClassName} {...modalProps} id={`menu-${id}`} isOpen={isOpen} onClose={onClose}>
      <ul className={`menu-content ${contentClassName}`} role='listbox' style={contentStyle} ref={menuContentRef}>
        {children}
      </ul>
    </Modal>
  );
};

export type MenuOptionProps = Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> & {
  id?: string;
  children?: React.ReactNode;
  label?: React.ReactNode;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  style?: React.CSSProperties;
  asCheckbox?: boolean;
  icon?: IconType;
  onClick?: (newValue: boolean) => void;
};

const MenuOption = ({
  children,
  label = '',
  asCheckbox,
  icon: Icon,
  id,
  disabled = false,
  selected = false,
  className = '',
  style = {},
  onClick = () => null,
  ...liProps
}: MenuOptionProps) => {
  const menuOptionClassName = useClassNames({
    'menu-option': true,
    [className]: true,
    'is-disabled': disabled,
    'is-selected': selected,
  });

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!disabled) {
        onClick(!selected);
      }
    },
    [disabled, onClick, selected],
  );

  const menuOptionContent = useMemo(() => {
    if (children) {
      return children;
    }

    if (asCheckbox) {
      return (
        <Checkbox
          className='menu-checkbox'
          disabled={disabled}
          value={selected}
          setValue={n => onClick(n)}
          name='option'
          style={{ pointerEvents: 'none' }}
          size='small'
          label={
            <>
              {Icon !== undefined && <Icon className='option-icon' />}
              <Typography variant='label'>{label}</Typography>
            </>
          }
        />
      );
    }

    return (
      <>
        {Icon !== undefined && <Icon className='option-icon' />}
        {typeof label === 'string' ? <Typography variant='label'>{label}</Typography> : label}
      </>
    );
  }, [asCheckbox, children, disabled, Icon, label, onClick, selected]);

  return (
    <li
      {...liProps}
      id={id}
      role='option'
      tabIndex={-1}
      aria-selected={selected}
      aria-disabled={disabled}
      onClick={handleClick}
      className={menuOptionClassName}
      style={style}
    >
      <Ripple zIndex={10} />
      {menuOptionContent}
    </li>
  );
};

const Divider = () => {
  return (
    <li>
      <Line className='divider' />
    </li>
  );
};

const Label = ({ children, className = '', ...props }: Omit<TypographyProps, 'variant'>) => {
  return (
    <li tabIndex={-1} className='menu-label'>
      <Typography {...props} variant='small' className={`menu-group-label ${className}`}>
        {children}
      </Typography>
    </li>
  );
};

type MenuGroupProps = Omit<React.HTMLAttributes<HTMLLIElement>, 'onClick'> & {
  children: React.ReactNode;
  label: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
};

const Group = ({
  children,
  label,
  className = '',
  style = {},
  contentClassName = '',
  contentStyle = {},
  ...props
}: MenuGroupProps) => {
  const groupClassName = useClassNames({
    'menu-group': true,
    [className]: Boolean(className),
  });

  return (
    <li tabIndex={-1} {...props} className={groupClassName} style={style}>
      {label && <Label>{label}</Label>}
      <ul className={`menu-group-content ${contentClassName}`} role='listbox' style={contentStyle}>
        {children}
      </ul>
    </li>
  );
};

Menu.Option = MenuOption;
Menu.Divider = Divider;
Menu.GroupLabel = Label;
Menu.Group = Group;
