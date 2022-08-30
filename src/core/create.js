const path = require("path");
const fs = require("fs-extra");
const Inquirer = require("inquirer");
const Creator = require("../utils/creator");

module.exports = async function (projectName, options) {
  const cwd = process.cwd();
  const targetDirectory = path.join(cwd, projectName);
  const creator = new Creator(projectName, targetDirectory);
  if (fs.existsSync(targetDirectory)) {
    if (options.force) {
      await fs.remove(targetDirectory);
      creator.create();
    } else {
      let { isOverwrite } = await new Inquirer.prompt([
        {
          name: "isOverwrite",
          type: "list",
          message:
            "Target directory is exsits, wheather overwrite this directory",
          choices: [
            { name: "yes", value: true },
            { name: "no", value: false },
          ],
        },
      ]);
      if (!isOverwrite) {
        console.log("Operation canceled!");
        process.exit();
      }
      await fs.remove(targetDirectory);
      creator.create();
    }
  } else {
    creator.create();
  }
};
