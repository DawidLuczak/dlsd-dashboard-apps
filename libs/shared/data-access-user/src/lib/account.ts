export interface Account {
  email: string;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface CreateAccountForm extends Credentials {
  repeatPassword: string;
}

export enum AccountFormMode {
  SIGN_IN,
  SIGN_UP,
}
