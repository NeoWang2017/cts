export interface ILoginOpts {
  scope?: string;
  returnScopes?: boolean;
}

export interface ILoginRes {
  authResponse: {
    code: string,
    grantedScopes?: string
  }
}
