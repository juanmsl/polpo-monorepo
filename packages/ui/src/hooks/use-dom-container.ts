import { useEffect, useState } from 'react';

const createContainer = (containerID: string) => {
  let domContainer = document.getElementById(containerID);

  if (domContainer === null) {
    domContainer = document.createElement('div');
    domContainer.setAttribute('id', containerID);
    document.body.appendChild(domContainer);
  }

  return domContainer;
};

export const useDomContainer = (containerID: string) => {
  const [container, setContainer] = useState<HTMLElement | null>(() => createContainer(containerID));

  useEffect(() => {
    const domContainer = document.getElementById(containerID);

    if (container === null || domContainer === null) {
      const domContainer = createContainer(containerID);

      setContainer(domContainer);
    }

    return () => {
      if (container && container.parentNode && process.env.NODE_ENV === 'production') {
        document.body.removeChild(container);
      }
    };
  }, [container, containerID]);

  return container;
};
