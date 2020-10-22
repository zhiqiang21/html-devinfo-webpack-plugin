/**
 * @file 将开发者信息进行aes加密
 * @date 2020/10/09
 * @author hpuhouzhiqiang@gmail.com
 */

const CryptoJS = require("crypto-js");
const privateKey = "4Dyw1iqVeoXY3w13MaNy2ZwhQ";


exports.encodeCrypto = function (data) {
  return CryptoJS.AES.encrypt(data, privateKey).toString();
}
