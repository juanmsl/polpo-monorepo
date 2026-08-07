import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { cn } from '../../helpers';

import { TabsList as TabListComponent, TabListProps } from './tabs-list';
import './tabs.styles.css';

type TabStatus = {
  isHidden: boolean;
};

type TabsContextState = {
  openTab: string;
  changeOpenTab: (id: string) => void;
  tabsStatus: Record<string, TabStatus>;
  changeTabStatus: (id: string, status: TabStatus) => void;
};

const TabsContext = createContext<TabsContextState | null>(null);

const useTab = (id: string, isHidden = false) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error('You cant use this component out off an Tabs component');
  }

  const { openTab, changeOpenTab, tabsStatus, changeTabStatus } = context;

  useEffect(() => {
    if (isHidden !== undefined) {
      changeTabStatus(id, { isHidden });
    }
  }, [id, isHidden, changeTabStatus]);

  return {
    isOpen: openTab === id,
    openTab: () => changeOpenTab(id),
    isHidden: tabsStatus[id]?.isHidden,
  };
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
  const [tabs, setTabs] = useState<TabsContextState['tabsStatus']>({});

  useEffect(() => {
    if (onChange) {
      onChange(openTab);
    }
  }, [openTab, onChange]);

  const changeOpenTab = useCallback<TabsContextState['changeOpenTab']>(id => setOpenTab(id), []);

  const changeTabStatus = useCallback<TabsContextState['changeTabStatus']>(
    (id, status) => {
      setTabs(prev => ({ ...prev, [id]: status }));

      if (openTab === id && status.isHidden) {
        changeOpenTab(defaultOpenTab);
      }
    },
    [changeOpenTab, defaultOpenTab, openTab],
  );

  return (
    <TabsContext.Provider
      value={{
        openTab,
        changeOpenTab,
        changeTabStatus,
        tabsStatus: tabs,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export type TabProps = {
  id: string;
  children: React.ReactNode;
  className?: string | ((isActive: boolean) => string);
  isHidden?: boolean;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
  ref?: React.RefObject<HTMLSpanElement | null>;
};

const Tab = ({ id, children, isHidden = false, className = '', style = {}, onClick, ref }: TabProps) => {
  const { isOpen, openTab } = useTab(id, isHidden);

  const handleClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    openTab();

    if (onClick) {
      onClick(e);
    }
  };

  if (isHidden) {
    return null;
  }

  return (
    <span
      className={cn('polpo-tab', isOpen && 'is-open', typeof className === 'function' ? className(isOpen) : className)}
      style={style}
      onClick={handleClick}
      ref={ref}
    >
      {children}
    </span>
  );
};

type TabPanelProps = {
  id: string;
  children: React.ReactNode;
};

const TabPanel = ({ id, children }: TabPanelProps) => {
  const { isOpen, isHidden } = useTab(id);

  return isOpen && !isHidden ? children : null;
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
