export module types {

  export interface Login {
    username: string;
    password: string;
  }

    export interface Langs {
      id: number;
      name: string;
    }

    export interface LangSwitcher {
        values: Langs[];
      }
  
  }
  