/**
 * @file 获取git开发者信息
 * @date 2020/10/09
 * @author hpuhouzhiqiang@didiglobal.com
 */
const path = require('path');
const chalk = require('chalk');
const gitConfData = require('gitconfiglocal');

// 进程运行的目录
const cwd = process.cwd();

exports.developGitInfo = function () {
  return new Promise((resolve, reject) => {
    gitConfData(path.resolve(cwd, '.git/config'), (err, data) => {
      if (err) {
        reject(err);
      }

      if (!data.user) {
        throw new Error(
          chalk.red(`please add you git config user and email info !! \n

          you can execute command config you git information
              git config --local user.name "xiaoxiaoyu"
              git config --local user.email "xiaoiaoyu@didiglobal.com"
        `)
        );
      }

      resolve({
        user: data.user,
        remote: data.remote
      });
    });
  });
};
