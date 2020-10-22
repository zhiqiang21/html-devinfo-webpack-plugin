/**
 * @file 获取OE开发者信息
 * @date 2020/10/13
 * @author hpuhouzhiqiang@gmail.com
 */


// 在OE上编译时git/config获取不到开发者信息，通过OE环境变量获取

module.exports = {
  OE_TRIGGER_USER: process.env.OE_TRIGGER_USER,
  OE_BRANCH_NAME: process.env.OE_BRANCH_NAME,
  OE_GIT_URL: process.env.OE_GIT_URL
}
