/* eslint no-console:0 */

const chalk = require('chalk');

class Sweetlog {
  constructor(itemsToShow) {
    // itemsToShow = ['info', 'warning', 'error', 'success'];
    let filter = itemsToShow;

    if (!filter) {
      filter = ['info', 'warning', 'error', 'success'];
    }

    this.level = filter;
  }

  info(...args) {
    if (this.level.indexOf('info') === -1) {
      return false;
    }

    // eslint-disable-next-line array-callback-return
    args.map((message) => {
      console.log(chalk.blue('-'), message);
    });

    return true;
  }
  warning(...args) {
    if (this.level.indexOf('warning') === -1) {
      return false;
    }

    // eslint-disable-next-line array-callback-return
    args.map((message) => {
      console.log(chalk.yellow('!'), message);
    });

    return true;
  }
  error(...args) {
    if (this.level.indexOf('error') === -1) {
      return false;
    }

    // eslint-disable-next-line array-callback-return
    args.map((message) => {
      console.log(chalk.red('✖'), message);
    });

    return true;
  }
  success(...args) {
    if (this.level.indexOf('success') === -1) {
      return false;
    }

    // eslint-disable-next-line array-callback-return
    args.map((message) => {
      console.log(chalk.green('✔'), message);
    });

    return true;
  }
}

module.exports = Sweetlog;
