export interface IWebsocket {
  emit: (event: string, toReturn: any) => void;
  on: (event: string, toReturn: any) => void;
}
