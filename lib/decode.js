
const CryptoJS = require("crypto-js");
const privateKey = "4Dyw1iqVeoXY3w13MaNy2ZwhQ";

var bytes  = CryptoJS.AES.decrypt('U2FsdGVkX19dl4Kx2l2Cyny7buztssE6h6GVe0hv9lEVYL5330bpLN/p7KALRI0I4dAJhy/ET4jM/9QIobS0IZOKxr0rw/i7udcpBlI4f/AyRIJtxr4vhMNBGiIgyMdpuPKEr5Jo93gONINi//6meqWPa0B6R+dKRGYLysV7yJQxvU1Bc4HLEvgjUSh9JiQQ8PD+gNcj+n++IhsqZldJ9ym20qpVBSDlTCQjs7WUkm6uvYLPP6DytwDPG2X55XyQt3dWD+oZUF0aC/flal5qNdZuzL5CINjHgfWY/5Rrmzw=', privateKey);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
