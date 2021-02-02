export namespace SqlSchema {
  interface Survey {
    id: number | bigint,
    type: string,
    name: string,
    count: number,
    status: number,
    created_on: string,
    last_updated: string
  }
  export interface SurveyDb extends Survey {
    record: Array<Array<string>>
  }
  export interface SurveyInput extends Survey {
    record: Array<SurveyRecord>
  }
  export interface SurveyRecord {
    [index: string]: string
  }
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
