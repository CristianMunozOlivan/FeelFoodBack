export interface Hasher {
  hash(raw: string): Promise<string>;
  compare(raw: string, hashed: string): Promise<boolean>;
}
