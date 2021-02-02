export namespace SqlSchema {
  interface User {
    id: number | bigint,
    email: string,
    password: string,
    created_on: string,
    last_updated: string,
    last_login: string,
    access_token: string
  }
  export interface UserInput extends User {

  }
}
