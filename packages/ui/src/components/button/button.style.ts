import styled from 'styled-components';

import { RadiusStyles, RadiusVariants, SizeStyles, SizeVariants } from '../../../core/variants';

export type ButtonColorStyles = {
  $color: string;
  $colorDark: string;
  $colorContrast: string;
};

export type ButtonStyleProps = ButtonColorStyles & {
  $size: `${SizeVariants}`;
  $radius: `${RadiusVariants}`;
};

export const ButtonStyle = styled.button<ButtonStyleProps>`
  cursor: pointer;
  font-weight: bold;
  display: grid;
  grid-auto-flow: column;
  gap: 0.7em;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  justify-items: center;
  text-align: center;
  justify-content: center;
  position: relative;
  user-select: none;

  .button-loader-icon {
    animation: spin 800ms linear infinite;
    font-size: 1.2em;
  }

  &.fit {
    width: fit-content;
  }

  &.full {
    width: 100%;
  }

  .button-left-icon,
  .button-right-icon {
    font-size: 1.2em;
    opacity: 1;
  }

  .button-text {
    display: grid;
    align-items: center;
  }

  .ripple-effect {
    background: ${props => props.$colorContrast};
  }

  padding: 1em;
  font-size: ${props => props.theme.constants.typography.label.fontSize};
  background: ${props => props.$color};
  color: ${props => props.$colorContrast};
  box-shadow: 0 0 0 0 transparent;
  transition: all 250ms ease;
  border: 1px solid ${props => props.$color};

  ${props => SizeStyles[props.$size]}
  ${props => RadiusStyles[props.$radius]}

  &:not(:disabled) {
    &:not(.no-shadow) {
      &:hover {
        box-shadow:
          0 1.4em 0.5em -1em ${props => props.theme.colors.black}88,
          0 0.7em 1em -0.5em ${props => props.theme.colors.black}88;
      }

      &:active {
        box-shadow:
          0 0.3em 0.4em -0.2em ${props => props.theme.colors.black}88,
          0 0.2em 0.8em -0.1em ${props => props.theme.colors.black}88;
      }
    }

    &:hover {
      transform: scale(1.02);
    }

    &:active {
      background: ${props => props.$colorDark};
      border-color: ${props => props.$colorDark};
      transform: scale(0.98);
    }
  }

  &:disabled {
    background: ${props => props.theme.colors.gray6};
    color: ${props => props.theme.colors.gray9};
    border: 1px solid ${props => props.theme.colors.gray6};
    cursor: not-allowed;
    pointer-events: none;
  }

  &.is-loading {
    pointer-events: none;
  }

  &.ghost-variant {
    background: transparent;
    color: ${props => props.$color};
    border: 1px solid;

    &:not(:disabled):hover {
      background: ${props => props.$color}22;
    }

    &:not(:disabled):active {
      background: ${props => props.$color}55;
    }

    &:disabled {
      color: ${props => props.theme.colors.gray6};
    }

    .ripple-effect {
      background: ${props => props.$color};
    }
  }

  &.flat-variant {
    background: transparent;
    color: ${props => props.$color};
    border: 0;

    &:not(:disabled):hover {
      background: ${props => props.$color}22;
    }

    &:not(:disabled):active {
      background: ${props => props.$color}55;
    }

    &:disabled {
      color: ${props => props.theme.colors.gray6};
    }

    .ripple-effect {
      background: ${props => props.$color};
    }
  }
`;
