export const isDefined = <T>(
  value: T | undefined | null
): value is NonNullable<T> => value !== undefined && value !== null;

export const isNotDefined = <T>(
  value: T | undefined | null
): value is undefined | null => value === undefined || value === null;

export const isEmpty = (
  value: string | undefined | null
): value is undefined | null =>
  value === undefined || value === null || value === "";

export const isNotEmpty = (value: string | undefined | null): value is string =>
  value !== undefined && value !== null && value !== "";

export const capitalize = (s: string): string =>
  (s && String(s[0]).toUpperCase() + String(s).slice(1)) || "";

export const stringifyError = (err: unknown): string =>
  typeof err === "string"
    ? err
    : err instanceof Error
      ? err.name + ": " + err.message
      : JSON.stringify(err);
