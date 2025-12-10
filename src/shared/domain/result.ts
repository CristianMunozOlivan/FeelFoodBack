export type Ok<T> = { ok: true; value: T }; // Resultado exitoso
export type Err<E = string> = { ok: false; error: E }; // Resultado con error
export type Result<T, E = string> = Ok<T> | Err<E>; // Tipo unión de resultados
export const ok = <T>(value: T): Ok<T> => ({ ok: true, value }); // Crea un resultado exitoso
export const err = <E>(error: E): Err<E> => ({ ok: false, error }); // Crea un resultado con error
