export module types {

  export interface Login {
    nickname: string;
    password: string;
    rememberMe: boolean;
  }

  export interface LoginAPI {
    nickname: string;
    password: string;
  }

    export interface Langs {
      id: number;
      name: string;
    }

    export interface LangSwitcher {
        values: Langs[];
      }

      export interface LoginResp {
        success: boolean;
        access_token: string;
        token_key: string;
      }
  
  }
  