import {GAME_TYPES, IMAGE_TYPES} from './quest-data';

const serverToTaskTypeMapper = {
  'two-of-two': GAME_TYPES.chooseTwoAnswers,
  'tinder-like': GAME_TYPES.chooseOneAnswer,
  'one-of-three': GAME_TYPES.choosePaint,
};

const serverToImgTypeMapper = {
  'photo': IMAGE_TYPES.photo,
  'painting': IMAGE_TYPES.paint
};

const preprocessAnswers = (answers) => answers.map((answer) => {
  return {
    imgSrc: answer.image.url,
    imgType: serverToImgTypeMapper[answer.type]
  };
});

const preprocessLevel = (level) => {
  return {
    task: level.question,
    type: serverToTaskTypeMapper[level.type],
    answers: preprocessAnswers(level.answers)
  };
};

export default (data) => {
  return data.map((level) => preprocessLevel(level));
};
