import { useState } from 'react';

import { Tooltip, TooltipProps } from '../tooltip';

type ClickToCopyProps = {
  children?: React.ReactNode;
  position?: TooltipProps['position'];
  offset?: TooltipProps['offset'];
  value: string;
  tooltipText: string;
  tooltipCopiedText?: string;
  copiedTextTimeout?: number;
};

/** Copies `value` to the clipboard when its children are clicked, showing a tooltip. */
export const ClickToCopy = ({
  children,
  value,
  position,
  offset,
  tooltipText,
  tooltipCopiedText,
  copiedTextTimeout = 500,
}: ClickToCopyProps) => {
  const [justCopied, setJustCopied] = useState(false);

  const handleCopy = () => {
    setJustCopied(true);
    navigator.clipboard.writeText(value);
    setTimeout(() => setJustCopied(false), copiedTextTimeout);
  };

  return (
    <Tooltip
      content={justCopied && tooltipCopiedText ? tooltipCopiedText : tooltipText}
      position={position}
      offset={offset}
    >
      <span onClick={handleCopy}>{children}</span>
    </Tooltip>
  );
};
