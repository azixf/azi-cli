const Inquirer = require("inquirer");
const { getRepo, getTagsByRepo } = require("../utils/api");
const loading = require('../utils/loading')

async function getRepoInfo() {
  const repoList = await loading('waitting for fetching template...', getRepo);
  const repos = repoList.map((item) => item.name);
  const { repo } = await new Inquirer.prompt([
    {
      name: "repo",
      type: "list",
      message: "Please choose a template",
      choices: repos,
    },
  ]);
  return repo;
}

async function getRepoTagsInfo(repo) {
  const tagList = await loading('waitting for checking wheather exists tags..', getTagsByRepo, repo)
  if(tagList.length) {
    const tags = tagList.map(tag => tag.name)
    const { tag } = await new Inquirer.prompt([
      {
        name: "tag",
        type: "list",
        message: "Please choose a version",
        choices: tags
      }
    ]) 
    return tag
  }
}

module.exports = {
  getRepoInfo,
  getRepoTagsInfo
};
