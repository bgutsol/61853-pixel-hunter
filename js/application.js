import Intro from './templates/intro/intro-presenter';
import Greeting from './templates/greeting/greeting-presenter';
import Rules from './templates/rules/rules-presenter';
import Stats from './templates/results/results-presenter';
import Game from './templates/game/game-presenter';
import GameModel from './data/game-model';

const main = document.querySelector(`main.central`);
const changeView = (template) => {
  main.innerHTML = ``;
  main.appendChild(template);
};

export default class Application {
  static showIntro() {
    const intro = new Intro();
    changeView(intro.element);
  }

  static showGreeting() {
    const greeting = new Greeting();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new Rules();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const game = new Game(new GameModel(playerName));
    changeView(game.element);
  }

  static showStats(model) {
    const stats = new Stats(model);
    changeView(stats.element);
  }
}
