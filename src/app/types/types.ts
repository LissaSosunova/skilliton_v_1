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
    profileStatus: null | string;
    langs: Langs | null;
    sex: any;
    userType?: number;
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
    native: Array<Lang> | [];
  }

  export interface KeyData {
    skills: Array<any> | [];
    interests: Array<any> | [];
    education: Array<any> | [];
    goals: Array<any> | [];
    services: Array<any> | [];
    workExperience: Array<any> | [];
    goalsSkipped: boolean;
    skillsSkipped: boolean;
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
    isError?: boolean;
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
        footerType?: number;
    };
  }

  export interface Filters {
    interests: Array<InterestTag>;
    skills: Array<SkillTag>;
    services: Array<ServicsTag>;
  }

  export interface InterestTag {
    id: number | null;
    name: string;
    srchStr: string;
  }
  export interface ServicsTag {
    id: number | null;
    name: string;
    srchStr: string;
  }

  export interface SkillTag {
    id: number | null;
    name: string;
    srchStr: string;
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
    currentLevel: number;
    expectedLevel: number;
    moneyOffered: boolean;
    servicesOffered: boolean;
    skillsOffered: boolean;
    withTrial: boolean;
    hidden: boolean;
    description?: string;
    id?: number;
    name?: string;
    services?: Array<number>;
    skills?: Array<number>;
    expectedResult?: string;
  }

  export interface AddSkillAPI {
    certificates?: Array<number> | [null];
    degree: string;
    description: string;
    educationLanguage: Array<any>;
    experience: string;
    expertise: string;
    isShared: boolean | true;
    level: number;
    moneyExpected: boolean;
    name?: string;
    prices: Array<Price>;
    recommendations?: Array<any> | [null];
    serviceExpected: boolean;
    skillId?: number;
    skills: Array<any> | [null];
    skillsExpected: boolean;
    withTrial: boolean;
  }

  export interface Price {
    type: number;
    currency: string;
    value: number;
  }

  export interface AddServiceAPI {
    id?: number;
    name?: string;
    recommendationsMedia?: [null];
  }

  export interface ViewProfile {
    profile: ProfileUser;
    keyData: KeyData;
  }

  export interface AddWork {
      id?: number;
      name?: string;
      periodOfTime: {
        dateFrom: string;
        dateTo?: string;
      };
      position: string;
  }

  export interface AddEducation {
      degree?: string;
      id?: number;
      name?: string;
      periodOfTime: {
        dateFrom: string;
        dateTo?: string;
      };
      specialization?: string;
      type: number;
  }

  export interface Match {
    avatar: string | null;
    firstName: string;
    jobPosition: string;
    lastName: string;
    matchId: number;
    rate: number;
    skillToObtain: Array<any> | [];
    skillToShare: Array<any> | [];
    summary: string;
    userEmail: string;
    workPlace: any;
  }

  export interface Message {
    id: number;
    eventType: number;
    time: string;
    content: {
      authorName: string;
      authorLastName: string;
      authorAvatar?: any;
      authorId: number;
      text: string;
      status: number;
      isEdited: boolean;
      isMine: boolean;
    }
  }
  export interface Chat {
    data: Array<Message>;
    error?: boolean;
    orderBy?: string;
    direction?: string;
    page?: number;
    limit?: number;
    total?: number;
    addInfo: AddInfoForChat;
  }
  export interface AddInfoForChat {
    id: number | null;
    matchId?: number;
    matchStatus?: number;
    isGroup?: boolean;
    lessonAgreed?: boolean;
    groupDetails?: number | null;
    chatDetails: {
      partnerName: string;
      partnerLastName: string;
      partnerAvatar?: string | null;
      chatGoalName?: string | null;
      chatSkillName?: string | null;
    };
    lastEvent?: any;
    isActive: boolean;
    unreadAmount: number | null;
    isPinned?: boolean;
    pinnedSort?: number;
  }
  export interface RequestListForChats {
    contactId: number | null;
    chatId: number | null;
    incoming: boolean;
    partnerName: string;
    partnerLastName: string;
    partnerAvatar?: number | null;
    requestTime: string;
    matchedSkillTagId?: number | null;
    matchedSkillName?: string;
    skillId?: number | null;
    goalId?: number | null;
    requestMessage?: string;
  }
  export interface ChatsListForChats {
    id: number | null;
    matchId?: number;
    matchStatus?: number;
    isGroup?: boolean;
    lessonAgreed?: boolean;
    groupDetails?: number | null;
    chatDetails: {
      partnerName: string;
      partnerLastName: string;
      partnerAvatar?: string | null;
      chatGoalName?: string | null;
      chatSkillName?: string | null;
    };
    lastEvent?: {
      eventType?: number | null;
      message?: {
        text: string;
        authorName: string;
        authorLastName: string;
        isMine: boolean;
      };
      lesson?: number | null;
    }
    isActive: boolean;
    unreadAmount: number | null;
    isPinned?: boolean;
  }
}
