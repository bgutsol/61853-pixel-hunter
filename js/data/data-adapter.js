import {GAME_TYPES, IMAGE_TYPES} from './quest-data';

const server2TaskTypeMapper = {
  'two-of-two': GAME_TYPES.chooseTwoAnswers,
  'tinder-like': GAME_TYPES.chooseOneAnswer,
  'one-of-three': GAME_TYPES.choosePaint,
};

const server2ImgTypeMapper = {
  'photo': IMAGE_TYPES.photo,
  'painting': IMAGE_TYPES.paint
};

const preprocessAnswers = (answers) => answers.map((answer) => {
  return {
    imgSrc: answer.image.url,
    imgType: server2ImgTypeMapper[answer.type]
  };
});

const preprocessLevel = (level) => {
  return {
    task: level.question,
    type: server2TaskTypeMapper[level.type],
    answers: preprocessAnswers(level.answers)
  };
};

export default (data) => {
  return data.map((level) => preprocessLevel(level));
};
