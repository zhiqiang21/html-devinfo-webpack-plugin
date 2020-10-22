/**
 * @file 获取git开发者信息
 * @date 2020/10/09
 * @author hpuhouzhiqiang@gmail.com
 */
const path = require('path');
const chalk = require('chalk');
const gitConfData = require('gitconfiglocal');
const _ = require('lodash');
const { OE_GIT_URL, OE_TRIGGER_USER } = require('./oe');

// 进程运行的目录
const cwd = process.cwd();

exports.developGitInfo = function () {
  return new Promise((resolve, reject) => {
    gitConfData(path.resolve(cwd, '.git/config'), (err, data) => {
      if (err) {
        reject(err);
      }

      if (!data.user && !process.env.OE_TRIGGER_USER) {
        throw new Error(
          chalk.red(`please add you git config user and email info !! \n
            you can execute command config you git information
                git config --local user.name "you-name"
                git config --local user.email "you-name@gmail.com"
        `));
      } else if (data.user && !process.env.OE_TRIGGER_USER) {
         // 本地环境构建
        resolve({
          user: _.get(data, 'user.name', ''),
          remote: _.get(data, 'remote.origin.url', '')
        });
      }

      // 如果是在OE环境构建
      if (process.env.OE_TRIGGER_USER) {
        resolve({
          user: OE_TRIGGER_USER,
          remote: OE_GIT_URL
        });
      }
    });
  });
};


//  git config info
// {"user":{"email":"hpuhouzhiqiang@gmail.com","name":"hpuhouzhiqiang"},"remote":{"origin":{"url":"git@git.xiaojukeji.com:ibt-fe/passenger-wallet.git","fetch":"+refs/heads/*:refs/remotes/origin/*"}}}
