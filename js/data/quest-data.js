export const IMAGE_TYPES = {
  photo: 0,
  paint: 1
};

export const GAME_TYPES = {
  chooseTwoAnswers: 0,
  chooseOneAnswer: 1,
  choosePaint: 2
};

export const QUEST_DATA = [
  {
    task: `Угадайте для каждого изображения фото или рисунок?`,
    type: GAME_TYPES.chooseTwoAnswers,
    answers: [
      {
        img: {
          src: `http://placehold.it/468x458`,
          width: `468`,
          height: `458`
        },
        type: IMAGE_TYPES.photo
      },
      {
        img: {
          src: `http://placehold.it/468x458`,
          width: `468`,
          height: `458`
        },
        type: IMAGE_TYPES.photo
      }
    ]
  },
  {
    task: `Угадай, фото или рисунок?`,
    type: GAME_TYPES.chooseOneAnswer,
    answers: [
      {
        img: {
          src: `http://placehold.it/705x455`,
          width: `705`,
          height: `455`
        },
        type: IMAGE_TYPES.photo
      }
    ]
  },
  {
    task: `Найдите рисунок среди изображений`,
    type: GAME_TYPES.choosePaint,
    answers: [
      {
        img: {
          src: `http://placehold.it/304x455`,
          width: `304`,
          height: `455`
        },
        type: IMAGE_TYPES.photo
      },
      {
        img: {
          src: `http://placehold.it/304x455`,
          width: `304`,
          height: `455`
        },
        type: IMAGE_TYPES.photo
      },
      {
        img: {
          src: `http://placehold.it/304x455`,
          width: `304`,
          height: `455`
        },
        type: IMAGE_TYPES.paint
      }
    ]
  }
];
