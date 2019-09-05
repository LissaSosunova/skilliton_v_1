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
            {code: 409, title: 'User is not unique. Details: '},
            {code: 401, title: 'Data is not correct. Details: '},
            {code: 400, title: 'Unknown error. Details: '},
            {code: 422, title: 'Data is not correct: you must to set coreect birthday (in the past).'}
        ],
        login: [
            {code: 409, title: 'User is not unique. Details: '},
            {code: 401, title: 'Data is not correct. Details: '}
        ]
    }
  };
  