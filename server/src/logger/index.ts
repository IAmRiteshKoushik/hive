import chalk from "chalk";
import { join } from "path";
import pino, { Logger } from "pino";

class Pino {
  static instance: Logger;

  constructor() {
    if (!Pino.instance) {
      Pino.instance = pino({
        timestamp: pino.stdTimeFunctions.isoTime, // ISO-8601 format
        transport: {
          target: "pino/file",
          options: {
            colorize: true,
            destination: join(
              `logs/${new Date().toJSON().slice(0, 10)}.log`,
            ),
            mkdir: true,
            sync: false,
          },
        },
      });
    }
  }

  public info = (msg: any, _extra?: any): void => {
    console.log(
      chalk.blue(`
[${new Date().toLocaleString()}]
[INFO]`),
      chalk.bold(chalk.blueBright(msg)),
    );
    Pino.instance.info(msg);
  };

  public warn = (msg: string, _extra?: any): void => {
    console.log(
      chalk.yellow(`
[${new Date().toLocaleString()}]
[WARNING]`),
      chalk.bold(chalk.yellowBright(msg)),
    );
    Pino.instance.warn(msg);
  };

  public error = (msg: string, _extra?: any): void => {
    console.log(
      chalk.red(`
[${new Date().toLocaleString()}]
[ERROR]`),
      chalk.bold(chalk.redBright(msg)),
    );
    Pino.instance.error(msg);
  };

  public log = (msg: string, _extra?: any): void => {
    console.log(
      chalk.green(`
[${new Date().toLocaleString()}]
[LOG]`),
      chalk.bold(chalk.greenBright(msg)),
    );
    Pino.instance.info(msg);
  };

  public fatal = (msg: string, _extra?: any): void => {
    console.log(
      chalk.magenta(`
[${new Date().toLocaleString()}]
[FATAL]`),
      chalk.bold(chalk.magentaBright(msg)),
    );
    Pino.instance.fatal(msg);
  };
}

const logger = new Pino();
export default logger;
