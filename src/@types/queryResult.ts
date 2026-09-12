export interface IQueryResult<T> {
    success: boolean;
    data?: T;
    error?: unknown;
}