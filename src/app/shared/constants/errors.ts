/* Static codes for Errors
*/ 

export const errorTypes = {
    app: {
        registration: [
            {code: 100, title: 'Passwords must be equal'},
            {code: 101, title: 'Code 100'}
        ],
        login: [
            {code: 100, title: 'Passwords must be equal'},
            {code: 101, title: 'Code 100'}
        ]
    },
    api:{
        registration: [   
            {code: 400, title: "Unknown error. Details: "},  
            {code: 401, title: "Data is not correct. Details: "},
            {code: 409, title: "Email is not unique. Details: "},
            {code: 410, title: "Nickname is not unique. Details: "},
            {code: 422, title: "Data is not correct: you must to set coreect birthday (in the past)."}
        ],
        login: [
            // У 401 нет детализации, логи и пароль если неверны, то в обоих случаях выпадает эта ошибка
            {code: 401, title: "Data is not correct."},
            {code: 403, title: "You did not confirm your e-mail yet. Please check your e-mail and click included Link. Server says: "},
            // Для римера зарезервивровать можно
            {code: 415, title: "You sent incorrect data. Details: "},
            {code: 416, title: "Empty/"}
        ]
    }
  };
  