export const postExapleAPI = {
  error: false,
  data: {
    posts: [
      {
        id: 126,
        date: '1396252431324',
        tags: ['Astronomy', 'Galaxy studing'],
        text: "The interdisciplinary field of data science deals with methods for using data to automatically produce knowledge, insights, and models for prognosis, risk, and action. The Master's degree programme, which is taught in English, connects machine learning, statistical data analysis, natural scientific methods of data assimilation, and business analytics. The programme offers broad and interdisciplinary structured training in methods and is characterised by a strong emphasis on practice and research.",
        images: ['assets/images/datascience.jpg'],
        image: 'assets/images/datascience.jpg',
        videos: [],
        audios:[],
        linksToLibrary: [],
        edited: true,
        useful: 13,
        useles: 2,
        author: {
          userEmail: 'mail@mail.com',
          firstName: 'Adrian',
          lastName: 'MacEvoy',
          avatar: 'assets/images/post-exaple.jpg',
          rate: 2.6,
          jobPosition: 'Astronaut',
          workPlace: 'NASA',
          top: false
        },
        quiz: {
            quizId: 2,
            quizText: 'To be or not to be?',
            answers:
            [
                {
                    id: 1,
                    text: 'To be',
                    count: 10
                },
                {
                    id: 2,
                    text: 'Not to be',
                    count: 3
                }
            ]
        },
        comments: {
          commentsAllowed: true,
          commentAmount: 11,
          lastComment:
            {
              commentId: 55,
              date: '1766282431324',
              userEmail: 'mail@mail.com',
              firstName: 'Adriana',
              lastName: 'MacEllie',
              authorAvatar: [],
              rate: 2.2,
              jobPosition: 'Master of Tattoo',
              workPlace: 'Saloon "ANNA"',
              text: "That's hilarious, man!",
              edited: false,
              image: [],
              subcomments: [
                {
                commentId: 59,
                date: '1766282432924',
                userEmail: 'mail@mail.com',
                firstName: 'Adrian',
                lastName: 'MacEvoy',
                authorAvatar: [],
                rate: 2.6,
                jobPosition: 'Astronaut',
                workPlace: 'NASA',
                text: "That's hilarious, man!",
                edited: false,
                image: []
            },
            {}
          ]
        }
      }
    },
    {
      id: 127,
      date: '1396952431324',
      tags: ['Tattoo', 'Artist', 'Minimal design'],
      text: 'Despite their permanence, many people view tattoos as a trend or a superficial decision that will be “regretted when we are older,” and often overlook the positive impact traditional tattoos and cosmetic tattoos have on the wearers’ lives. As you’ve learned from Maddie’s story, tattoo artists can empower people to feel part of an inclusive community, as well as to overcome physical and mental trauma. They can even integrate scars from major surgery into tattoo designs and give people the confidence to love their bodies again.',
      images: ['assets/images/datascience2.jpg'],
      image: 'assets/images/datascience2.jpg',
      videos: [],
      audios:[],
      linksToLibrary: [],
      edited: true,
      useful: 13,
      useles: 2,
      author: {
        userEmail: 'mail@mail.com',
        firstName: 'Elisa',
        lastName: 'Holly',
        avatar: 'assets/images/post-exaple2.jpg',
        rate: 4.6,
        jobPosition: 'Tattoo master',
        workPlace: 'Saloon "ANNA"',
        top: false
      },
      quiz: {
          quizId: 2,
          quizText: 'To be or not to be?',
          answers:
          [
              {
                  id: 1,
                  text: 'To be',
                  count: 10
              },
              {
                  id: 2,
                  text: 'Not to be',
                  count: 3
              }
          ]
      },
      comments: {
        commentsAllowed: true,
        commentAmount: 123,
        lastComment:
          {
            commentId: 54,
            date: '1566282431324',
            userEmail: 'mail@mail.com',
            firstName: 'Adrian',
            lastName: 'MacEvoy',
            authorAvatar: [],
            rate: 2.6,
            jobPosition: 'Astronaut',
            workPlace: 'NASA',
            text: "That's hilarious, man!",
            edited: false,
            image: [],
            subcomments: [
              {
              commentId: 54,
              date: '54578745121',
              userEmail: 'mail@mail.com',
              firstName: 'Adrian',
              lastName: 'MacEvoy',
              authorAvatar: [],
              rate: 2.6,
              jobPosition: 'Astronaut',
              workPlace: 'NASA',
              text: "That's hilarious, man!",
              edited: false,
              image: []
          },
          {}
        ]
      }
    }
  }
  ]
    },
  page: 0,
  limit: 20,
  total: 40
};
