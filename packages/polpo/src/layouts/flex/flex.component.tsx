import React, { createElement } from 'react';

type FlexProps = {
  tag?: React.HTMLElementType;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  direction?: React.CSSProperties['flexDirection'];
  wrap?: React.CSSProperties['flexWrap'];
  basis?: React.CSSProperties['flexBasis'];
  grow?: React.CSSProperties['flexGrow'];
  shrink?: React.CSSProperties['flexShrink'];
  flow?: React.CSSProperties['flexFlow'];
  pc?: React.CSSProperties['placeContent'];
  pi?: React.CSSProperties['placeItems'];
  ps?: React.CSSProperties['placeSelf'];
  jc?: React.CSSProperties['justifyContent'];
  ji?: React.CSSProperties['justifyItems'];
  js?: React.CSSProperties['justifySelf'];
  ac?: React.CSSProperties['alignContent'];
  ai?: React.CSSProperties['alignItems'];
  as?: React.CSSProperties['alignSelf'];
  gap?: React.CSSProperties['gap'];
};

export const Flex = ({
  tag = 'section',
  children,
  className,
  style,
  direction,
  wrap,
  basis,
  grow,
  shrink,
  flow,
  pc,
  pi,
  ps,
  jc,
  ji,
  js,
  ac,
  ai,
  as,
  gap,
}: FlexProps) => {
  return createElement(
    tag,
    {
      className,
      style: {
        ...style,
        ...(direction ? { flexDirection: direction } : {}),
        ...(wrap ? { flexWrap: wrap } : {}),
        ...(basis ? { flexBasis: basis } : {}),
        ...(grow ? { flexGrow: grow } : {}),
        ...(shrink ? { flexShrink: shrink } : {}),
        ...(flow ? { flexFlow: flow } : {}),
        ...(pc ? { placeContent: pc } : {}),
        ...(pi ? { placeItems: pi } : {}),
        ...(ps ? { placeSelf: ps } : {}),
        ...(jc ? { justifyContent: jc } : {}),
        ...(ji ? { justifyItems: ji } : {}),
        ...(js ? { justifySelf: js } : {}),
        ...(ac ? { alignContent: ac } : {}),
        ...(ai ? { alignItems: ai } : {}),
        ...(as ? { alignSelf: as } : {}),
        ...(gap ? { gap: gap } : {}),
        display: 'flex',
      },
    },
    children,
  );
};
