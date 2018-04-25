import AbstractView from '../abstract-view';
import StatsListView from './stats-list-view';
import {ANSWER_TYPES} from '../data/quest-data';
import {calculateResult} from '../data/quest';

export default class TotalStatsView extends AbstractView {

  static getHtml(state, answers, gameStats) {
    const statsList = new StatsListView(gameStats);
    let tableHtml = ``;

    if (answers.length < 10) {
      tableHtml = `<table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td>
          ${statsList.template}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
    } else {

      const correctAnswersLength = answers.filter((answer) => answer.isCorrect).length;
      const fastAnswersLength = gameStats.filter((mod) => mod === ANSWER_TYPES.fast).length;
      const slowAnswersLength = gameStats.filter((mod) => mod === ANSWER_TYPES.slow).length;
      const totalResult = calculateResult(answers, state.lives);

      tableHtml = `<h1>Победа!</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${statsList.template}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">${correctAnswersLength}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${fastAnswersLength}&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${fastAnswersLength * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${state.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">${state.lives * 50}</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${slowAnswersLength}&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-${slowAnswersLength * 50}</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalResult}</td>
      </tr>
    </table>`;
    }

    return `<div class="result">${tableHtml}</div>`;
  }
}
