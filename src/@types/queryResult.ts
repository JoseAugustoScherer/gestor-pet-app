export type IQueryResult<T> =
  | { success: true; data: T }
  | { success: false; error?: unknown };