/*
 *KeyValuesOf
 *
 *Description:
 *  This generic type extract specific attributes from an object type, this is
 *  useful when you are creating a component with a generic type, and then you
 *  want to add a prop that only could receive specific attributes from that
 *  generic object.
 *
 *  Example:
 *    - select.tsx
 *
 *      type SelectProps<T> = {
 *        options: Array<T>;
 *        renderAttribute: KeyValuesOf<T, string>; // <---- Only allow string attributes from T
 *      }
 *
 *      const Select = <T,>(props: SelectProps<T>) => { ... }
 *
 *    - user.entities.ts
 *
 *      type UserProfileEntity = {
 *        picture: string;
 *        website: string;
 *      };
 *
 *      type UserEntity = {
 *        name: string;
 *        lastname: string;
 *        age: number;
 *        profile: UserProfileEntity;
 *      }
 *
 *    - page.tsx
 *
 *      import { Select } from './components';
 *      import { UserEntity } from './user.entities';
 *
 *      <Select<UserEntity>
 *        options={options}
 *        renderAttribute='name' // <---- Only allow 'name | lastname'
 *      />
 *
 *Params:
 *  T: Object or map Type with keys
 *  V: Type to extract from T
 *
 *Example:
 *  Input: KeyValuesOf<UserEntity, string>
 *  Output: name | lastname
 *
 *  Input: KeyValuesOf<UserEntity, number>
 *  Output: age
 *
 *  Input: KeyValuesOf<UserEntity, string | number>
 *  Output: name | lastname | age
 *
 *  Input: KeyValuesOf<UserEntity, UserProfileEntity>
 *  Output: profile
 *
 */
export type KeyValuesOf<T, V> = {
  [P in keyof T]-?: T[P] extends V ? P : never;
}[keyof T];

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
