export interface ISignInPayload {
  email: string;
  password: string;
}

export interface IError {
  data: {
    message: string;
  };
}
