import getIntro from './templates/intro';
import getGreeting from './templates/greeting';
import getRules from './templates/rules';
import getStats from './templates/total-stats';
import Game from './templates/game/game-presenter';
import GameModel from './data/game-model';

const main = document.querySelector(`main.central`);
const changeView = (template) => {
  main.innerHTML = ``;
  main.appendChild(template);
};

export default class Application {
  static showIntro() {
    const intro = getIntro();
    changeView(intro);
  }

  static showGreeting() {
    const greeting = getGreeting();
    changeView(greeting);
  }

  static showRules() {
    const rules = getRules();
    changeView(rules);
  }

  static showGame(playerName) {
    const game = new Game(new GameModel(playerName));
    changeView(game.element);
  }

  static showStats(model) {
    const stats = getStats(model);
    changeView(stats);
  }
}
