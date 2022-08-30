const util = require("util");
const downloadGitRepo = require("download-git-repo");
const loading = require("./loading");
const path = require("path");
const { getRepoInfo, getRepoTagsInfo } = require("../core/repo");
const chalk = require("chalk");

class Creator {
  constructor(name, target) {
    this.name = name;
    this.target = target;
    this.downloadGitRepo = util.promisify(downloadGitRepo);
  }

  async create() {
    console.log(this.name, this.target);
    const repo = await getRepoInfo();
    const tag = await getRepoTagsInfo(repo);
    await this.download(repo, tag);
    console.log(`\r\n${chalk.green('Successfully created project')} ${chalk.cyan(this.name)}`);
    console.log(`\r\n  cd ${this.name}`);
    console.log(`  pnpm install`);
    console.log(`  pnpm dev`);
  }

  async download(repo, tag) {
    const templateUrl = `azi-org/${repo}${tag ? "#" + tag : ""}`;
    console.log(templateUrl);
    await loading(
      "pulling template...",
      this.downloadGitRepo,
      templateUrl,
      this.target
    );
  }
}

module.exports = Creator;
