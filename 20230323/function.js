const toString = Object.prototype.toString;
const isString = function (obj) {
  return toString.call(obj) == `[object String]`;
};
const isFunction = function (obj) {
  return toString.call(obj) == `[object Function]`;
};

const isType = function (type) {
  return function (obj) {
    return toString.call(obj) == `[object ${type}]`;
  };
};

const isBool = isType("Boolean");
const bool = false;
console.log(isBool(bool));

const isNull = isType("Null");
const nl = null;
console.log(isNull(nl));

const isNumber = isType("Number");
const nb = 123;
console.log(isNumber(nb));
