const axios = require("axios");

const instance = axios.create({
  baseURL: "https://api.github.com"
})

instance.interceptors.response.use((res) => {
  return Promise.resolve(res.data);
}, (err) => {
  console.log(err);
  return Promise.reject(err)
});

/**
 * 获取所有仓库
 * @returns Promise 仓库信息
 */
async function getRepo() {
  return instance.get("/orgs/azi-org/repos")
}

/**
 * 
 * @param {string} repo 模板名称 
 * @returns Promise 版本信息
 */
async function getTagsByRepo(repo) {
  return instance.get(`/repos/azi-org/${repo}/tags`)
}

module.exports = {
  getRepo,
  getTagsByRepo
}