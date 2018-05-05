import {gameTypes, imageTypes} from './quest-data';

const serverToTaskTypeMapper = {
  'two-of-two': gameTypes.CHOOSE_TWO_ANSWERS,
  'tinder-like': gameTypes.CHOOSE_ONE_ANSWER,
  'one-of-three': gameTypes.CHOOSE_ONE_OF_THREE,
};

const serverToImgTypeMapper = {
  'photo': imageTypes.PHOTO,
  'painting': imageTypes.PAINT
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
