import React, { createContext, useContext, useEffect, useState } from 'react';

import { useClassNames } from '../../hooks';

import { TabsList as TabListComponent, TabListProps } from './tabs-list';
import './tabs.styles.css';

type TabsContextState = {
  openTab: string;
  changeOpenTab: (id: string) => void;
};

const TabsContext = createContext<TabsContextState | null>(null);

const useTab = (id: string): [boolean, () => void] => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('You cant use this component out off an Tabs component');
  }

  const { openTab, changeOpenTab } = context;

  return [openTab === id, () => changeOpenTab(id)];
};

const useTabsContext = (): TabsContextState => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('You cant use this component out off an Tabs component');
  }

  return context;
};

type TabsProps = {
  children: React.ReactNode;
  defaultOpenTab: string;
  onChange?: (id: string) => void;
};

export const Tabs = ({ children, defaultOpenTab, onChange }: TabsProps) => {
  const [openTab, setOpenTab] = useState(defaultOpenTab);

  useEffect(() => {
    if (onChange) {
      onChange(openTab);
    }
  }, [openTab, onChange]);

  return (
    <TabsContext.Provider
      value={{
        openTab,
        changeOpenTab: id => setOpenTab(id),
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

type TabProps = {
  id: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  ref?: React.RefObject<HTMLSpanElement | null>;
};

const Tab = ({ id, children, className = '', style = {}, onClick, ref }: TabProps) => {
  const [isOpen, openTab] = useTab(id);
  const tabClassNames = useClassNames({
    tab: true,
    [className]: !!className,
    'is-open': isOpen,
  });

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    openTab();

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <span className={tabClassNames} style={style} onClick={handleClick} ref={ref}>
      {children}
    </span>
  );
};

type TabPanelProps = {
  id: string;
  children: React.ReactNode;
};

const TabPanel = ({ id, children }: TabPanelProps) => {
  const [isOpen] = useTab(id);

  return isOpen ? children : null;
};

const TabList = ({ children, ...props }: Omit<TabListProps, 'openTab'>) => {
  const { openTab } = useTabsContext();

  return (
    <TabListComponent {...props} openTab={openTab}>
      {children}
    </TabListComponent>
  );
};

Tabs.Tab = Tab;
Tabs.TabPanel = TabPanel;
Tabs.TabList = TabList;
