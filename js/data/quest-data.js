const QUESTION_TYPES = {
  chooseTwoAnswers: `Угадайте для каждого изображения фото или рисунок?`,
  chooseOneAnswer: `Угадай, фото или рисунок?`,
  choosePaint: `Найдите рисунок среди изображений`
};

export const IMAGE_TYPES = {
  photo: `photo`,
  paint: `paint`
};

export const GAME_TYPES = {
  chooseTwoAnswers: 0,
  chooseOneAnswer: 1,
  choosePaint: 2
};

export const ANSWER_TYPES = {
  wrong: `wrong`,
  correct: `correct`,
  slow: `slow`,
  fast: `fast`,
  unknown: `unknown`
};

export const TOTAL_RESULT_TYPES = {
  fail: 0,
  win: 1
};

export const QUEST_DATA = [
  {
    task: QUESTION_TYPES.chooseTwoAnswers,
    type: GAME_TYPES.chooseTwoAnswers,
    answers: [
      {
        imgSrc: `http://i.imgur.com/1KegWPz.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://k42.kn3.net/D2F0370D6.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.chooseOneAnswer,
    type: GAME_TYPES.chooseOneAnswer,
    answers: [
      {
        imgSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.choosePaint,
    type: GAME_TYPES.choosePaint,
    answers: [
      {
        imgSrc: `http://i.imgur.com/DKR1HtB.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://i.imgur.com/DiHM5Zb.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://k32.kn3.net/5C7060EC5.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.chooseTwoAnswers,
    type: GAME_TYPES.chooseTwoAnswers,
    answers: [
      {
        imgSrc: `http://i.imgur.com/1KegWPz.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://k42.kn3.net/D2F0370D6.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.chooseOneAnswer,
    type: GAME_TYPES.chooseOneAnswer,
    answers: [
      {
        imgSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.choosePaint,
    type: GAME_TYPES.choosePaint,
    answers: [
      {
        imgSrc: `http://i.imgur.com/DKR1HtB.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://i.imgur.com/DiHM5Zb.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://k32.kn3.net/5C7060EC5.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.chooseTwoAnswers,
    type: GAME_TYPES.chooseTwoAnswers,
    answers: [
      {
        imgSrc: `http://i.imgur.com/1KegWPz.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://k42.kn3.net/D2F0370D6.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.chooseOneAnswer,
    type: GAME_TYPES.chooseOneAnswer,
    answers: [
      {
        imgSrc: `https://k42.kn3.net/CF42609C8.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.choosePaint,
    type: GAME_TYPES.choosePaint,
    answers: [
      {
        imgSrc: `http://i.imgur.com/DKR1HtB.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://i.imgur.com/DiHM5Zb.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://k32.kn3.net/5C7060EC5.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  },
  {
    task: QUESTION_TYPES.chooseTwoAnswers,
    type: GAME_TYPES.chooseTwoAnswers,
    answers: [
      {
        imgSrc: `http://i.imgur.com/1KegWPz.jpg`,
        imgType: IMAGE_TYPES.photo
      },
      {
        imgSrc: `https://k42.kn3.net/D2F0370D6.jpg`,
        imgType: IMAGE_TYPES.paint
      }
    ]
  }
];
