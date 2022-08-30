const ora = require("ora");

let retry_time = 3;
let current_time = 0;
/**
 * 睡眠函数
 * @param {number} n 时间 毫秒
 * @returns
 */
function sleep(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

module.exports = async function loading(message, fn, ...args) {
  const spinner = ora(message);
  spinner.start();
  try {
    const result = await fn(...args);
    spinner.succeed();
    current_time = 0
    return result;
  } catch {
    if(current_time < retry_time) {
      current_time++
      spinner.fail("request failed, retrying...");
      await sleep(1000)
      return loading(message, fn, ...args)
    }
    spinner.fail("request failed")
    process.exit()
  }
};
