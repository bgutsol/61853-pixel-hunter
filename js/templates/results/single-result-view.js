import AbstractView from '../abstract-view';
import StatsListView from '../components/stats-list-view';
import {AnswerType, TotalResultType} from '../../data/quest-data';

export default class SingleResult extends AbstractView {
  constructor(result, number) {
    super();

    this.stats = result.stats;
    this.lives = result.lives;
    this.number = number + 1;
    if (this.lives > 0) {
      this.score = result.totalScore;
      this.status = TotalResultType.WIN;
    } else {
      this.status = TotalResultType.FAIL;
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
      case TotalResultType.WIN:
        totalResult = this.stats.filter((mod) => mod === AnswerType.FAST || mod === AnswerType.CORRECT).length;
        pointsCost = `×&nbsp;100`;
        break;
      case TotalResultType.FAIL:
        totalResult = `fail`;
        classMod = `result__total--final`;
        break;
    }
    return `<td class="result__points">${pointsCost}</td>
      <td class="result__total ${classMod}">${totalResult}</td>`;
  }

  get additionalInfoHtml() {
    const fastAnswersLength = this.stats.filter((mod) => mod === AnswerType.FAST).length;
    const slowAnswersLength = this.stats.filter((mod) => mod === AnswerType.SLOW).length;

    if (this.status === TotalResultType.WIN) {
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
