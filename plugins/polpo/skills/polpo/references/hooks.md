# Hooks

Polpo v0.1.32 - generated from the source code, do not edit.

## useAsync

Tracks the state of a promise (`idle` | `pending` | `resolved` | `rejected`) with its data and error.

```ts
import { useAsync } from 'polpo/hooks';
```

```ts
useAsync: <T>(initialState?: AsyncState<T>) => AsyncState<T> & { setData: (data: T) => void; setError: (error: Error) => void; run: (promise: Promise<T>) => void; }
```

## useClassNames

Builds a className string from a `{ className: condition }` map.

```ts
import { useClassNames } from 'polpo/hooks';
```

```ts
useClassNames: (classes: Record<string, boolean>) => string
```

## useClickOutside

Calls `callback` on mousedown outside the given ref(s) or when Escape is pressed.

```ts
import { useClickOutside } from 'polpo/hooks';
```

```ts
useClickOutside: <T extends HTMLElement>(ref: RefObject<T | null> | Array<RefObject<T | null>>, callback: () => void) => void
```

## useConstant

Returns a value computed once on the first render.

```ts
import { useConstant } from 'polpo/hooks';
```

```ts
useConstant: <T>(initializer: T | (() => T)) => T
```

## useCookie

Reads and writes a browser cookie as React state.

```ts
import { useCookie } from 'polpo/hooks';
```

```ts
useCookie: <T = unknown>(cookieName: string, defaultValue?: T, options?: CookieOptions) => [T, UpdateCookie<T>, RemoveCookie]
```

## useDebounce

Returns `value` after it stops changing for `delay` ms (default 500).

```ts
import { useDebounce } from 'polpo/hooks';
```

```ts
useDebounce: <T>(value: T, delay?: number) => T
```

## useDebounceState

State with a debounced copy: returns `[value, debouncedValue, setValue]`.

```ts
import { useDebounceState } from 'polpo/hooks';
```

```ts
useDebounceState: <T>(defaultValue: T, delay?: number) => [T, T, React.Dispatch<React.SetStateAction<T>>]
```

## useDimensions

Returns the `{ width, height }` of an element, updated with a ResizeObserver.

```ts
import { useDimensions } from 'polpo/hooks';
```

```ts
useDimensions: (ref: React.RefObject<HTMLElement>) => { width: number; height: number; }
```

## useDomContainer

Returns (creating it if needed) a `<div>` with the given id appended to `document.body`.

```ts
import { useDomContainer } from 'polpo/hooks';
```

```ts
useDomContainer: (containerID: string) => HTMLElement | null
```

## useEventListener

Adds an event listener to window (default), document, a media query or an element ref, and removes it on unmount.

```ts
import { useEventListener } from 'polpo/hooks';
```

```ts
useEventListener: <EventName extends keyof MediaQueryListEventMap>(eventName: EventName, callback: (event: MediaQueryListEventMap[EventName]) => void, element: RefObject<MediaQueryList | null> | undefined, options?: boolean | AddEventListenerOptions) => void
useEventListener: <EventName extends keyof WindowEventMap>(eventName: EventName, callback: (event: WindowEventMap[EventName]) => void, element?: undefined, options?: boolean | AddEventListenerOptions) => void
useEventListener: <EventName extends keyof HTMLElementEventMap, ElementRef extends HTMLElement = HTMLDivElement>(eventName: EventName, callback: (event: HTMLElementEventMap[EventName]) => void, element: RefObject<ElementRef | null> | undefined, options?: boolean | AddEventListenerOptions) => void
useEventListener: <EventName extends keyof DocumentEventMap>(eventName: EventName, callback: (event: DocumentEventMap[EventName]) => void, element: RefObject<Document | null> | undefined, options?: boolean | AddEventListenerOptions) => void
```

## useFileReader

Reads `File`s as data URLs, returning name, size, formatted size, type and url for each.

```ts
import { useFileReader } from 'polpo/hooks';
```

```ts
useFileReader: (inputFiles: Array<File>) => FileResolvedT[]
```

## useGeolocation

Watches the browser geolocation: `{ data, error, isLoading }`.

```ts
import { useGeolocation } from 'polpo/hooks';
```

```ts
useGeolocation: () => UseGeolocationReturn
```

## useHover

Returns whether the pointer is over the element.

```ts
import { useHover } from 'polpo/hooks';
```

```ts
useHover: () => boolean
```

## useInView

Returns `{ ref, inView }`: whether the element referenced by `ref` is in the viewport.

```ts
import { useInView } from 'polpo/hooks';
```

```ts
useInView: (initOptions?: IntersectionObserverInit) => { ref: import("/Users/juanmsl/Code/personal/polpo-monorepo/node_modules/.pnpm/@types+react@19.2.6/node_modules/@types/react/index").RefObject<HTMLElement | null>; inView: boolean; }
```

## useInputHandlers

Focus/blur/change handlers for inputs that also track `isFocus`.

```ts
import { useInputHandlers } from 'polpo/hooks';
```

```ts
useInputHandlers: <T extends InputTypes>({ onBlur, onFocus, onChange, }?: UseInputHandlersProps<T>) => { isFocus: boolean; handlers: { onFocus: (e: React.FocusEvent<T>) => void; onBlur: (e: React.FocusEvent<T>) => void; onChange: (e: React.ChangeEvent<T>) => void; }; }
```

## useIntersectionObserver

Observes one or more refs with an IntersectionObserver.

```ts
import { useIntersectionObserver } from 'polpo/hooks';
```

```ts
useIntersectionObserver: <T extends Element>(ref: RefObject<T | null> | Array<RefObject<T | null>>, callback: IntersectionObserverCallback, initOptions?: IntersectionObserverInit) => void
```

## useMediaQuery

Returns whether a CSS media query matches, e.g. `useMediaQuery('(max-width: 480px)')`.

```ts
import { useMediaQuery } from 'polpo/hooks';
```

```ts
useMediaQuery: (query: string) => boolean
```

## useModal

Open state for modals, menus and tooltips: `{ containerRef, isOpen, openModal, closeModal }`.

```ts
import { useModal } from 'polpo/hooks';
```

```ts
useModal: <T extends HTMLElement>() => { containerRef: import("/Users/juanmsl/Code/personal/polpo-monorepo/node_modules/.pnpm/@types+react@19.2.6/node_modules/@types/react/index").RefObject<T | null>; isOpen: boolean; openModal: () => void; closeModal: () => void; }
```

## useModalInContainer

Positions a modal element on the screen or relative to a container element.

```ts
import { useModalInContainer } from 'polpo/hooks';
```

```ts
useModalInContainer: <Container extends HTMLElement = HTMLElement, Modal extends HTMLElement = Container>({ offset, windowOffset, position, modalRef, containerRef, isOpen, }: UseModalInContainerParams<Container, Modal>) => void
```

## useModalTransition

Open/close transition state of a modal; locks page scroll while visible.

```ts
import { useModalTransition } from 'polpo/hooks';
```

```ts
useModalTransition: ({ transitionDuration, isOpen }: UseModalTransitionParams) => { isVisible: boolean; modalState: ModalState; }
```

## useMousePosition

Tracks the mouse position on the page and relative to an element.

```ts
import { useMousePosition } from 'polpo/hooks';
```

```ts
useMousePosition: (containerRef?: React.RefObject<HTMLElement | SVGElement | null>) => { ref: React.RefObject<HTMLElement | null>; x: null | number; y: null | number; elementX: number | null; elementY: number | null; elementPositionX: number | null; elementPositionY: number | null; }
```

## useOnlineStatus

Returns whether the browser is online.

```ts
import { useOnlineStatus } from 'polpo/hooks';
```

```ts
useOnlineStatus: () => boolean
```

## useRenderCount

Returns how many times the component has rendered (debugging).

```ts
import { useRenderCount } from 'polpo/hooks';
```

```ts
useRenderCount: () => number
```

## useResizeObserver

Observes one or more refs with a ResizeObserver.

```ts
import { useResizeObserver } from 'polpo/hooks';
```

```ts
useResizeObserver: <T extends Element>(ref: RefObject<T | null> | Array<RefObject<T | null>>, callback: ResizeObserverCallback) => void
```

## useSafeDispatch

Wraps a dispatch so it is ignored after the component unmounts.

```ts
import { useSafeDispatch } from 'polpo/hooks';
```

```ts
useSafeDispatch: <T>(dispatch: React.Dispatch<T>) => ((action: T) => void)
```

## useScroll

Returns `{ ref, position }` with the `[scrollLeft, scrollTop]` of the referenced element.

```ts
import { useScroll } from 'polpo/hooks';
```

```ts
useScroll: () => { ref: import("/Users/juanmsl/Code/personal/polpo-monorepo/node_modules/.pnpm/@types+react@19.2.6/node_modules/@types/react/index").RefObject<HTMLElement | null>; position: number[]; }
```

## useStateHistory

useState that also returns the history of values: `[state, setState, history]`.

```ts
import { useStateHistory } from 'polpo/hooks';
```

```ts
useStateHistory: <T>(initialState: T | (() => T)) => [T, Dispatch<SetStateAction<T>>, Array<T>]
useStateHistory: <T = undefined>() => [T | undefined, Dispatch<SetStateAction<T | undefined>>, Array<T>]
```

## useToggle

Boolean state: returns `[value, toggle, setValue]`.

```ts
import { useToggle } from 'polpo/hooks';
```

```ts
useToggle: (defaultValue?: boolean) => (boolean | import("/Users/juanmsl/Code/personal/polpo-monorepo/node_modules/.pnpm/@types+react@19.2.6/node_modules/@types/react/index").Dispatch<import("/Users/juanmsl/Code/personal/polpo-monorepo/node_modules/.pnpm/@types+react@19.2.6/node_modules/@types/react/index").SetStateAction<boolean>>)[]
```

## useToggleValues

Cycles through `values`: returns `[currentValue, toggle(index?)]`.

```ts
import { useToggleValues } from 'polpo/hooks';
```

```ts
useToggleValues: <T>(values: Array<T>, defaultIndex?: number) => [T, (index?: number) => void]
```

## useViewport

Returns the window `{ width, height, orientation }`, updated on resize.

```ts
import { useViewport } from 'polpo/hooks';
```

```ts
useViewport: () => UseViewportData
```

## Enums

Every prop typed with these values also accepts the plain string, e.g. `'image/png'`.

### FileTypeEnum

Known MIME types returned by `useFileReader`.

`import { FileTypeEnum } from 'polpo/hooks';`

| Member | Value |
| --- | --- |
| `PNG` | `'image/png'` |
| `PDF` | `'application/pdf'` |

### ModalState

Lifecycle states of a modal transition.

`import { ModalState } from 'polpo/hooks';`

| Member | Value |
| --- | --- |
| `OPENING` | `'OPENING'` |
| `OPEN` | `'OPEN'` |
| `CLOSING` | `'CLOSING'` |
| `CLOSED` | `'CLOSED'` |

## Types

### CookieOptions

```ts
export type CookieOptions = {
  days?: number;
  expires?: Date;
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};
```

### FileResolvedT

```ts
export type FileResolvedT = {
  name: string;
  size: number;
  formatSize: string;
  type: FileTypeEnum;
  url: FileReader['result'];
};
```

### UseModalInContainerParams

```ts
export type UseModalInContainerParams<
  Container extends HTMLElement = HTMLElement,
  Modal extends HTMLElement = Container,
> = {
  windowOffset?: number;
  offset?: number;
  position?: `${PositionContainer}`;
  modalRef: RefObject<Modal | null>;
  containerRef?: RefObject<Container | null>;
  isOpen: boolean;
};
```

### UseModalTransitionParams

```ts
export type UseModalTransitionParams = {
  transitionDuration?: number;
  isOpen: boolean;
};
```
