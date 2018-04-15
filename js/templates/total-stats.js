import {createElement, changeView} from '../util';
import {calculateResult} from '../data/quest';
import getHeader from './header';
import getFooter from './footer';
import getStatsListHtml from './stats-list';

export default (state, answers, gameStats) => {
  let resultTable = ``;

  if (answers.length < 10) {
    resultTable = `<table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td>
          ${getStatsListHtml(gameStats)}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>`;
  } else {
    const totalResult = calculateResult(answers, state.lives);

    resultTable = `<h1>Победа!</h1>
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${getStatsListHtml(gameStats)}
        </td>
        <td class="result__points">×&nbsp;100</td>
        <td class="result__total">900</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">1&nbsp;<span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">50</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">100</td>
      </tr>
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">2&nbsp;<span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">×&nbsp;50</td>
        <td class="result__total">-100</td>
      </tr>
      <tr>
        <td colspan="5" class="result__total  result__total--final">${totalResult}</td>
      </tr>
    </table>`;
  }

  const html = `<div class="result">${resultTable}</div>`;

  const template = createElement(html);
  template.insertBefore(getHeader(), template.firstChild);
  template.appendChild(getFooter());

  return template;
};
