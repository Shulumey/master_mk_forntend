export enum StatusEnum{
  success= "OK",
  error = "ERROR"
}
export interface ServerResponse {
  status: StatusEnum,
  result: any
}
