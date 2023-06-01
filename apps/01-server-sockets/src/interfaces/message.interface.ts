export interface ResponseMessage {
  ok: boolean;
  response?: string;
  message?: Message | Message[];
}

export interface Message {
  id?: string;
  message: string;
}
