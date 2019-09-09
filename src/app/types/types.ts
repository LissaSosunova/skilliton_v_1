export module types {

  export interface User {
    active: boolean;
    birthAddress: any;
    birthDate: string;
    currentAddress: any;
    email: string;
    id: number;
    lastName: string;
    name: string;
    nickname: string;
    rate: number;
    sex: null
    socialAccount: string;
    socialAccountId: any | null;
    summary: any | null;
  }
  export interface Login {
    username: string;
    password: string;
    rememberMe: boolean;
  }

  export interface LoginAPI {
    username: string;
    password: string;
    rememberMe: boolean;
  }

  export interface RegistrationAPI {
    birthDate: string;
    email: string;
    lastName: string;
    name: string;
    nickname: string;
    password: string;
    isMobile: boolean;
  }

  export interface RegistrationFormData {
    firstNameOfUser: string;
    lastNameOfUser: string;
    nickNameOfUser: string;
    birthdayDate: string;
    email: string;
    password: string;
    passConf: string;
  }
  export interface RegistrationResponse {
    body: any;
    statusCode: number;
    statusCodeValue: string;
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
    export interface ApiResponse {
      data: any;
      error: boolean;
      errorMessage: string;
    }

    export interface FormPopupConfig {
      position?: 'top-center'|'center-center';
      cssClass?: string;
      header?: string;
      isHeaderCloseBtn?: boolean;
      formId?: string;
      isFooter?: boolean;
      isHeader?: boolean;
      footer?: {
          isCloseBtn?: boolean;
          closeBtnText?: string;
          isSubmitBtn?: boolean;
          submitBtnText?: string;
          isSubmitLoading?: boolean;
          isSubmitDisabled?: boolean;
          isRemoveBtn?: boolean;
          removeBtnText?: string;
          isRemoveLoading?: boolean;
          btnOrder?: string[];
      };
  }
  }
  