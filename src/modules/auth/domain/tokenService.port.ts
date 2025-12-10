export type TokenPayload = { id: string; email: string };
// Puerto para el servicio de tokens
// Define el método para firmar tokens JWT
export interface TokenService {
  sign(payload: TokenPayload): Promise<string>;
}
