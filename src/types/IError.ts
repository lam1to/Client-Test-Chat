export interface IError {
  isError: boolean;
  error?: string;
  statusCode?: number;
  message?: string[];
}
