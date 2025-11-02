export type TokenPayload = { id: string; email: string };
export interface TokenService {
  sign(payload: TokenPayload): Promise<string>;
  // verify?(token: string): Promise<TokenPayload>; // opcional, si lo necesitas
}
