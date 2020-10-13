
const CryptoJS = require("crypto-js");
const privateKey = "4Dyw1iqVeoXY3w13MaNy2ZwhQ";

var bytes  = CryptoJS.AES.decrypt('U2FsdGVkX182kXoMY11l1BDlZRWD3vcB/CTNsu34+FDvF6y4J47OizoQ+FKf2mPG587gciTkAynrSHDhRKXwT3g0KtGcohz717zZRGILJDoM4WRBv2u1b1s4vQVJFpxBaYLcjD8mmDlpDQPWwPDToyEtcV9Cd62DLDdSKfjh2s2+ryfB+KiFZ5mcDZ44CmxjY1IlWG3aN8y0W3INZowJc2a9jv0qlA9i6WsIhdP+PuJrIh6v//imoTw68gbaquy9TJNpzOnzaUajOb7YGJ/DQmJ9i/u0W8f764rXy/+eQ+Y=', privateKey);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'

//  git config info
// {"user":{"email":"hpuhouzhiqiang@didiglobal.com","name":"hpuhouzhiqiang"},"remote":{"origin":{"url":"git@git.xiaojukeji.com:ibt-fe/passenger-wallet.git","fetch":"+refs/heads/*:refs/remotes/origin/*"}}}

// OE git info
// {"user":"hpuhouzhiqiang","remote":"git@git.xiaojukeji.com:ibt-fe/passenger-wallet.git"}
