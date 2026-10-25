# Types

Polpo v0.2.0 - generated from the source code, do not edit.

## Types

### KeyValuesOf

```ts
export type KeyValuesOf<T, V> = {
  [P in keyof T]-?: T[P] extends V ? P : never;
}[keyof T];
```

### DeepPartial

```ts
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```
