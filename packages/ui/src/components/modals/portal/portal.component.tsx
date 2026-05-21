import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { useDomContainer } from '../../../hooks';

type PortalProps = {
  id: string;
  children: ReactNode;
};

export const Portal = ({ children, id }: PortalProps) => {
  const root = useDomContainer(id);

  if (root === null) {
    return null;
  }

  return createPortal(children, root);
};
