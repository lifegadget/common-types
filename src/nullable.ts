/**
 * **Nullable**
 *
 * Allows properties `P` of a dictionary defined by `T` to be both
 * T[P] but also null. If you define `P` it will be which ever properties
 * you set as _nullable_ otherwise it will be all properties.
 *
 * ```ts
 * // all props on IProduct are nullable
 * type NullableProduct = Nullable<IProduct>;
 * // the `id` prop on IProduct is nullable; others remain as before
 * type NullableId = Nullable<IProduct, 'id'>;
 * ```
 *
 * > Note: this is a minor breaking change as of version `1.17.0` but
 * effectively offers a superset of functionality old variant.
 */
export type Nullable<
  T,
  /** the props to add nullable to */
  P extends keyof T = keyof T,
  TOmitted extends keyof Omit<T, P> = keyof Omit<T, P>
> = {
  [key in P]: T[P] | null;
} &
  { [key in TOmitted]: T[TOmitted] };
