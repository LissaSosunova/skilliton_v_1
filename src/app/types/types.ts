// tslint:disable-next-line: no-namespace
export module types {

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
    password: string;
    isMobile: boolean;
  }

  export interface RegistrationFormData {
    firstNameOfUser: string;
    lastNameOfUser: string;
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

  export interface Lang {
    id: number;
    name: string;
  }

  export interface LangSwitcher {
      values: Lang[];
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

  export interface NewUser {
    profile: ProfileUser;
    keyData: KeyData;
    contacts: Array<any> | [];
    posts: Posts;
    notifications: Notifications;
    userType?: number;
  }

  export interface ProfileUser {
    id: number;
    email: string;
    avatar: any;
    socialNetworksProfiles: Array<any>;
    name: string;
    lastName: string;
    birthDate: string;
    placeOfBirth: any;
    placeOfResidence: any;
    rate: number;
    profileSummary: null | string;
    langs: Langs | null;
    sex: any;
  }

  export interface Avatar {
    url?: string;
    owner: string;
    avatar?: AvatarObject;
  }

  export interface AvatarObject {
    contentType: string;
    image: string;
    formData: any;
  }

  export interface Langs {
    other: Array<Lang> | [];
    native: null | Lang;
  }

  export interface KeyData {
    skills: Array<any> | [];
    interests: Array<any> | [];
    education: Array<any> | [];
    goals: Array<any> | [];
    myServices: Array<any> | [];
    workExperience: Array<any> | [];
  }

  export interface Posts {
    public: Array<any> | [];
    saved: Array<any> | [];
    drafts: Array<any> | [];
    favorite: Array<any> | [];
  }

  export interface Notifications {
    ignored: Array<Notification> | [];
    deferred: Array<Notification> | [];
    system: Array<Notification> | [];
    chats: Array<Notification> | [];
    active: Array<Notification> | [];
  }

  export interface Notification {
    id: number;
    status: string;
    text: string;
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
  export interface Filters {
    tagsArr: Array<TagsArr>;
  }

  export interface TagsArr {
    tagId: number | null;
    tagName: string;
    categoryId: number | null;
    categoryName: any;
  }

  export interface FindTag {
    query: string;
  }

  export interface PostTag {
    category: boolean;
    categoryId: number;
    name: string;
    status: string;
  }
  export interface AutoCompleteModel {
    value: any;
    name: string;
  }
  export interface CategoryElement {
    categoryId?: number | null;
    tagName: string;
  }
  export interface PostInitInfo {
    selectedTagsId: Array<number> | null;
    newTags?: Array<CategoryElement>;
  }
  export interface AddGoalAPI {
      currentLevel: string;
      expectedLevel: string;
      name?: string;
      tagId?: number;
      decription?: string;

  }
}
