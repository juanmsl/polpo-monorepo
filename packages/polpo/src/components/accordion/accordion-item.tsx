import React, { useMemo } from 'react';
import { IconType } from 'react-icons';
import { FaCaretLeft } from 'react-icons/fa';

import { useClassNames } from '../../hooks';
import { SlideCard } from '../cards';
import { Typography } from '../typography';

import { useAccordionItem } from './accordion.component';

type NodeFunction = (isOpen: boolean) => React.ReactNode;

type ContentType = React.ReactNode | NodeFunction;

type AccordionItemCommonProps = {
  icon?: IconType;
  children: React.ReactNode;
  startContent?: ContentType;
  endContent?: ContentType;
  className?: string;
  style?: React.CSSProperties;
  classNames?: {
    header?: string;
    headerContent?: string;
    title?: string;
    subtitle?: string;
    toggleIcon?: string;
    body?: string;
  };
};

type AccordionItemTitleProps = AccordionItemCommonProps & {
  title?: ContentType;
  subtitle?: ContentType;
  content?: never;
};

type AccordionItemContentProps = AccordionItemCommonProps & {
  title?: never;
  subtitle?: never;
  content?: ContentType;
};

type AccordionItemProps = AccordionItemTitleProps | AccordionItemContentProps;

const getContent = (content: ContentType | undefined, isOpen: boolean): React.ReactNode | undefined => {
  if (typeof content === 'function') {
    return content(isOpen);
  }

  return content;
};

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  subtitle,
  children,
  icon: Icon = FaCaretLeft,
  startContent,
  content,
  endContent,
  classNames = {},
  className = '',
  style = {},
}: AccordionItemProps) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const [isOpen, toggle] = useAccordionItem(id);
  const headerClassName = useClassNames({
    'accordion-header': true,
    'has-start-content': !!startContent,
    [classNames?.header ?? '']: !!classNames?.header,
    'is-open': isOpen,
  });

  const headerContentClassName = useClassNames({
    'accordion-header-content': true,
    [classNames?.headerContent ?? '']: !!classNames?.headerContent,
  });

  const toggleIconClassName = useClassNames({
    'accordion-toggle-icon': true,
    isOpen: isOpen,
    [classNames?.toggleIcon ?? '']: !!classNames?.toggleIcon,
  });

  const bodyContentClassName = useClassNames({
    'accordion-body': true,
    [classNames?.body ?? '']: !!classNames?.body,
  });

  const titleContent = getContent(title, isOpen);
  const subtitleContent = getContent(subtitle, isOpen);
  const headerStart = getContent(startContent, isOpen);
  const headerMiddle = getContent(content, isOpen) ?? (
    <section className={headerContentClassName}>
      <Typography className={classNames?.title} variant='body' noPadding weight='bold'>
        {titleContent}
      </Typography>
      <Typography className={classNames?.subtitle} variant='label' noPadding weight='light'>
        {subtitleContent}
      </Typography>
    </section>
  );
  const headerEnd = getContent(endContent, isOpen) ?? <Icon className={toggleIconClassName} />;

  const accordionItemClassName = useClassNames({
    'accordion-item': true,
    [className]: Boolean(className),
  });

  return (
    <section className={accordionItemClassName} style={style}>
      <section className={headerClassName} onClick={toggle}>
        {headerStart}
        {headerMiddle}
        {headerEnd}
      </section>
      <SlideCard isOpen={isOpen}>
        <section className={bodyContentClassName}>{children}</section>
      </SlideCard>
    </section>
  );
};
