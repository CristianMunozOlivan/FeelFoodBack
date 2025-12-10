// Puerto para el servicio de hashing
// Define los métodos para hashear y comparar contraseñas
export interface Hasher {
  hash(raw: string): Promise<string>;
  compare(raw: string, hashed: string): Promise<boolean>;
}
