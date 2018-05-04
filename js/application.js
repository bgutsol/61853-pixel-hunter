import Intro from './templates/intro/intro-presenter';
import Greeting from './templates/greeting/greeting-presenter';
import Rules from './templates/rules/rules-presenter';
import Stats from './templates/results/results-presenter';
import Game from './templates/game/game-presenter';
import ErrorView from './templates/components/error-view';

import GameModel from './data/game-model';
import Loader from './data/loader';

const main = document.querySelector(`main.central`);
const changeView = (template) => {
  main.innerHTML = ``;
  main.appendChild(template);
};

let questData = [];
export default class Application {
  static showIntro() {
    const intro = new Intro();
    changeView(intro.element);

    Loader.loadData()
        .then(this.showGreeting)
        .catch(this.showError);
  }

  static showGreeting(data) {
    questData = data;
    const greeting = new Greeting();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new Rules();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const game = new Game(new GameModel(questData, playerName));
    changeView(game.element);
  }

  static showStats(results, playerName) {
    const stats = new Stats(results, playerName);
    changeView(stats.element);
  }

  static showError(error) {
    const errorScreen = new ErrorView(error);
    changeView(errorScreen.element);
  }
}
