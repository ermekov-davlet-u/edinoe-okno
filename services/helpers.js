const { wordSplit } = require("../services/utils");

// var yourString = "The quick brown fox jumps over the lazy dog"; //replace with your string.
// var maxLength = 6 // maximum number of characters to extract
// //Trim and re-trim only when necessary (prevent re-trim when string is shorted than maxLength, it causes last word cut)
// if (yourString.length > trimmedString.length) {
//   //trim the string to the maximum length
//   var trimmedString = yourString.substr(0, maxLength);
//   //re-trim if we are in the middle of a word and
//   trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
// }

const helpers = () => {
  return {
    wordSplit: (str, index = 0, firstLen = 29, defaultLen = 51) =>
      wordSplit(str, index, firstLen, defaultLen),
    inc: (value) => {
      return parseInt(value) + 1;
    },
    ifCond: (v1, operator, v2, options) => {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!=":
          return v1 != v2 ? options.fn(this) : options.inverse(this);
        case "!==":
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case "&&":
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case "||":
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    }
  };
};

module.exports = helpers;