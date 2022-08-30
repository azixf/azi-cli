const commander = require("commander");
const package = require("../../package.json");
const chalk = require("chalk");

// --help -V --version
commander
  .name(package.name)
  .usage("<command> [option]")
  .version(package.version);

commander.on("--help", () => {
  console.log();
  console.log(
    "\r\n" + ` Run ${chalk.cyan('azi-cli <command> --help')} for detailed usage of given command`
  );
  console.log();
});

// config
commander
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value by key")
  .option("-s, --set <key> <value>", "set config[key] equals value")
  .option("-d, --delete <key>", "delete config key")
  .action((value, keys) => {
    console.log(value, keys);
  });

commander
  .command("create <project-name>")
  .description("create a new project")
  .option("-f, --force", "overwrite target directory if it exsits")
  .action((projectName, options) => {
    require("./create")(projectName, options)
  });

commander.parse(process.argv);
