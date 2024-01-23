export interface IHash {
  hash: (payload: string) => Promise<string>;
  compare: (payload: string, hashedPayload: string) => Promise<boolean>;
}
