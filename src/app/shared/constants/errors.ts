/* Static codes for Errors
*/ 

export const errorTypes = {
    app: {
        registration: [
            {code: 100, title: 'Passwords must be equal'},
            {code: 101, title: 'Code 100'},
            {code: 102, title: 'Check your data and try again'},
            {code: 103, title: "Data is not correct: you must to set coreect birthday (in the past) and You must be over 14 years old."}
        ],
        login: [
            {code: 100, title: 'Passwords must be equal'},
            {code: 101, title: 'Code 100'}
        ],
        setExactData: [
            {
                code: 100,
                title: "In this page you can not ceate new skill name. ",
                recomend: "Please, select a skill from the list or skip this step."},
            {
                code: 101,
                title: "You can not ceate new name for Interests. ",
                recomend: "Please, select an Interest from the list and then press button 'DONE'."}
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
            {code: 403, title: "You did not confirm your e-mail yet. Please check your e-mail and click included Link. "},
            // Для примера зарезервивровать можно
            {code: 415, title: "You sent incorrect data. Details: "},
            {code: 416, title: "Empty/"}
        ]
    }
  };
