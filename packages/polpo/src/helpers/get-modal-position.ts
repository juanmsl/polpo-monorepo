export enum PositionContainer {
  CENTER = 'center',
  TOP = 'top',
  TOP_LEFT = 'top left',
  TOP_RIGHT = 'top right',
  TOP_CENTER = 'top center',
  LEFT = 'left',
  LEFT_TOP = 'left top',
  LEFT_BOTTOM = 'left bottom',
  LEFT_CENTER = 'left center',
  RIGHT = 'right',
  RIGHT_TOP = 'right top',
  RIGHT_BOTTOM = 'right bottom',
  RIGHT_CENTER = 'right center',
  BOTTOM = 'bottom',
  BOTTOM_LEFT = 'bottom left',
  BOTTOM_RIGHT = 'bottom right',
  BOTTOM_CENTER = 'bottom center',
}

export type PositionObject = {
  x: number;
  y: number;
  top: number;
  left: number;
  w: number;
  h: number;
};

export type ModalPosition = {
  left: number;
  top: number;
};

export type GetModalPositionParams = {
  c: PositionObject;
  m: PositionObject;
  offset: number;
  position: PositionContainer;
};

/*
 * @description Calculates the position of the modal relative to the container
 *
 * @param c - The container's position object
 * @param m - The modal's position object
 * @param offset - The offset between the container and the modal
 * @param position - The position of the modal
 *
 * -----------------------------------------------------------------------------
 * @returns The position of the modal relative to the container
 */
export const getModalPosition = ({ c, m, offset, position }: GetModalPositionParams): ModalPosition => {
  // Default bottom
  let top = c.y + c.h + offset;
  let left = c.x - (m.w - c.w) * (50 / 100);

  switch (position) {
    case PositionContainer.TOP:
    case PositionContainer.TOP_CENTER:
      top = c.y - m.h - offset;
      left = c.x - (m.w - c.w) / 2;

      break;
    case PositionContainer.TOP_LEFT:
      top = c.y - m.h - offset;
      left = c.x - m.w + c.w;

      break;

    case PositionContainer.TOP_RIGHT:
      top = c.y - m.h - offset;
      left = c.x;

      break;

    case PositionContainer.BOTTOM:
    case PositionContainer.BOTTOM_CENTER:
      top = c.y + c.h + offset;
      left = c.x - (m.w - c.w) / 2;

      break;

    case PositionContainer.BOTTOM_LEFT:
      top = c.y + c.h + offset;
      left = c.x - m.w + c.w;

      break;

    case PositionContainer.BOTTOM_RIGHT:
      top = c.y + c.h + offset;
      left = c.x;

      break;

    case PositionContainer.LEFT:
    case PositionContainer.LEFT_CENTER:
      top = c.y - (m.h - c.h) / 2;
      left = c.x - m.w - offset;

      break;

    case PositionContainer.LEFT_TOP:
      top = c.y - m.h + c.h;
      left = c.x - m.w - offset;

      break;

    case PositionContainer.LEFT_BOTTOM:
      top = c.y;
      left = c.x - m.w - offset;

      break;

    case PositionContainer.RIGHT:
    case PositionContainer.RIGHT_CENTER:
      top = c.y - (m.h - c.h) / 2;
      left = c.x + c.w + offset;

      break;

    case PositionContainer.RIGHT_TOP:
      top = c.y - m.h + c.h;
      left = c.x + c.w + offset;

      break;

    case PositionContainer.RIGHT_BOTTOM:
      top = c.y;
      left = c.x + c.w + offset;

      break;
  }

  return {
    left: Math.round(left),
    top: Math.round(top),
  };
};

export const getOppositePosition = (
  { top, left }: ModalPosition,
  position: PositionContainer,
  windowOffset: number,
  m: PositionObject,
) => {
  const positions = position.split(' ');
  const newPosition = [];
  const rightOffset = left + m.w + windowOffset - window.innerWidth;
  const bottomOffset = top + m.h + windowOffset - window.innerHeight;

  for (const p of positions) {
    if (p === PositionContainer.TOP && top < windowOffset) {
      newPosition.push(PositionContainer.BOTTOM);
    } else if (p === PositionContainer.LEFT && left < windowOffset) {
      newPosition.push(PositionContainer.RIGHT);
    } else if (p === PositionContainer.BOTTOM && bottomOffset > 0) {
      newPosition.push(PositionContainer.TOP);
    } else if (p === PositionContainer.RIGHT && rightOffset > 0) {
      newPosition.push(PositionContainer.LEFT);
    } else {
      newPosition.push(p);
    }
  }

  return newPosition.join(' ') as PositionContainer;
};

export const fixModalPosition = ({ top, left }: ModalPosition, m: PositionObject, windowOffset: number) => {
  const rightOffset = left + m.w + windowOffset - window.innerWidth;
  const bottomOffset = top + m.h + windowOffset - window.innerHeight;

  left = rightOffset > 0 ? left - rightOffset : left;
  top = bottomOffset > 0 ? top - bottomOffset : top;

  left = left < windowOffset ? windowOffset : left;
  top = top < windowOffset ? windowOffset : top;

  return { top, left };
};

type getModalPositionRelativeToContainerParams = GetModalPositionParams & {
  windowOffset: number;
};

export const getModalPositionRelativeToContainer = ({
  c,
  m,
  offset,
  windowOffset,
  position,
}: getModalPositionRelativeToContainerParams): Record<string, string> => {
  const params = { c, m, offset, position };
  let modalContainerStyle = getModalPosition(params);

  const oppositePosition = getOppositePosition(modalContainerStyle, position, windowOffset, m);

  if (oppositePosition !== position) {
    modalContainerStyle = getModalPosition({
      ...params,
      position: oppositePosition,
    });
  }

  const fixedPosition = fixModalPosition(modalContainerStyle, m, windowOffset);

  return {
    left: `${fixedPosition.left}px`,
    top: `${fixedPosition.top}px`,
  };
};
