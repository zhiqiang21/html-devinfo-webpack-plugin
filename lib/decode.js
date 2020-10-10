
const CryptoJS = require("crypto-js");
const privateKey = "4Dyw1iqVeoXY3w13MaNy2ZwhQ";

var bytes  = CryptoJS.AES.decrypt('U2FsdGVkX1/gF0kVra4l5QSWx9uqKZ9eVW9Q4SPPYwm/OlWrHXK9qrSjiUNtmcJflqn7f63FrDDo3Z904OFLC9ADq6jLes9IsLnHpdqJtVoCjtBt04br95s+58xFIrTWBAdvzXU40cAHExAs6cSh5eZSdn7VEeNdnVsVrklrIjbP9Q7wc8UnMnmWaDCxA/aZYDhOLyHRV6XQne3DHg5BihDYjMH02q59l98dOz+9aWJfmMpmk7YSQ4u7KQLc//6zUkgPb7UYr+aKEx47LNxGMx28G7yRw3gWhjlKN2cgPqA=', privateKey);
var originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
