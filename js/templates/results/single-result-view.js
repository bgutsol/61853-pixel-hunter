import AbstractView from '../abstract-view';
import StatsListView from '../components/stats-list-view';
import {ANSWER_TYPES, TOTAL_RESULT_TYPES} from '../../data/quest-data';

export default class SingleResult extends AbstractView {
  constructor(result, number) {
    super();

    this.stats = result.stats;
    this.lives = result.lives;
    this.number = number + 1;
    if (this.lives > 0) {
      this.score = result.totalScore;
      this.status = TOTAL_RESULT_TYPES.win;
    } else {
      this.status = TOTAL_RESULT_TYPES.fail;
    }
  }

  get template() {
    const statsList = new StatsListView(this.stats);

    return `<table class="result__table">
      <tr>
        <td class="result__number">${this.number}</td>
        <td colspan="2">
          ${statsList.template}
        </td>
        ${this.pointsHtml}
      </tr>
      ${this.additionalInfoHtml}
    </table>`;
  }

  get pointsHtml() {
    let totalResult = ``;
    let classMod = ``;
    let pointsCost = ``;

    switch (this.status) {
      case TOTAL_RESULT_TYPES.win:
        totalResult = this.stats.filter((mod) => mod === ANSWER_TYPES.fast || mod === ANSWER_TYPES.correct).length;
        pointsCost = `×&nbsp;100`;
        break;
      case TOTAL_RESULT_TYPES.fail:
        totalResult = `fail`;
        classMod = `result__total--final`;
        break;
    }
    return `<td class="result__points">${pointsCost}</td>
      <td class="result__total ${classMod}">${totalResult}</td>`;
  }

  get additionalInfoHtml() {
    const fastAnswersLength = this.stats.filter((mod) => mod === ANSWER_TYPES.fast).length;
    const slowAnswersLength = this.stats.filter((mod) => mod === ANSWER_TYPES.slow).length;

    if (this.status === TOTAL_RESULT_TYPES.win) {
      return `<tr>
            <td></td>
            <td class="result__extra">Бонус за скорость:</td>
            <td class="result__extra">${fastAnswersLength}&nbsp;<span class="stats__result stats__result--fast"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">${fastAnswersLength * 50}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Бонус за жизни:</td>
            <td class="result__extra">${this.lives}&nbsp;<span class="stats__result stats__result--alive"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">${this.lives * 50}</td>
          </tr>
          <tr>
            <td></td>
            <td class="result__extra">Штраф за медлительность:</td>
            <td class="result__extra">${slowAnswersLength}&nbsp;<span class="stats__result stats__result--slow"></span></td>
            <td class="result__points">×&nbsp;50</td>
            <td class="result__total">-${slowAnswersLength * 50}</td>
          </tr>
          <tr>
            <td colspan="5" class="result__total  result__total--final">${this.score}</td>
          </tr>`;
    }
    return ``;
  }
}
