import {GameType, ImageType} from './quest-data';

const ServerToTaskTypeMapper = {
  'two-of-two': GameType.CHOOSE_TWO_ANSWERS,
  'tinder-like': GameType.CHOOSE_ONE_ANSWER,
  'one-of-three': GameType.CHOOSE_ONE_OF_THREE,
};

const ServerToImgTypeMapper = {
  'photo': ImageType.PHOTO,
  'painting': ImageType.PAINT
};

const preprocessAnswers = (answers) => answers.map((answer) => {
  return {
    imgSrc: answer.image.url,
    imgType: ServerToImgTypeMapper[answer.type]
  };
});

const preprocessLevel = (level) => {
  return {
    task: level.question,
    type: ServerToTaskTypeMapper[level.type],
    answers: preprocessAnswers(level.answers)
  };
};

export default (data) => {
  return data.map((level) => preprocessLevel(level));
};
