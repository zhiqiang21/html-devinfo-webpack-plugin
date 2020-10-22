/**
 * @file 编译页面时给页面生成唯一的页面ID
 * @date 2020/10/14
 * @author hpuhouzhiqiang@gmail.com
 */

const axios = require('axios');
const path = require('path');
const devGitInfo = require('./git');
const API_HOST = `http://xxxxx.com/`;
const MODULEID_API_PATH = `/payfe/api/moduleid`;
const MODULEINFO_API_PATH = `/payfe/api/moduleinfo`;

// http://127.0.0.1:7001/payfe/api/moduleid?module=passenger-wallet
exports.moduleID = async function () {
  const devInfo = await devGitInfo.developGitInfo();
  const repoUrlObj = path.parse(devInfo.remote) || '';

  return axios.get(path.join(API_HOST, API_PATH), {
    params: {
      module: repoUrlObj.name
    }
  });
};

// http://127.0.0.1:7001/payfe/api/moduleinfo?moduleid=103
exports.initModuleInfo = async function () {};

// /payfe/api/updatemodule
exports.updateModuleInfo = async function () {};
