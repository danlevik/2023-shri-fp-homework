/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import {
  __,
  allPass,
  andThen,
  applySpec,
  assoc,
  compose,
  concat,
  curry,
  gt,
  gte,
  ifElse,
  juxt,
  length,
  lt,
  match,
  mathMod,
  otherwise,
  partial,
  prop,
  tap,
  test,
  toString,
} from "ramda";
import Api from "../tools/api";

const api = new Api();

// Функции для обработки чисел
const thenStringify = andThen(toString);

const gThenTwo = gt(__, 2);
const lThenTen = lt(__, 10);

const toNumber = (value) => parseFloat(value);
const roundNumber = (value) => Math.round(value);

const toInteger = compose(roundNumber, toNumber);

const pow = curry(Math.pow);
const getPowSquare = pow(__, 2);
const thenGetPowSquare = andThen(getPowSquare);

const getModuloForThree = mathMod(__, 3);
const thenGetModuloForThree = andThen(getModuloForThree);

// Валидация
const thenGetLength = andThen(length);

const lengthGreaterThenTwo = compose(gThenTwo, length);
const lengthLowerThenTen = compose(lThenTen, length);
const isPositiveNumber = test(/^(?:[1-9]\d*|0)?(?:\.\d+)?$/);

// Для проверок в консоли браузера
// const logInConsole = (value) => console.log(value);
// const logInConsoleAndHandOver = tap(logInConsole);

// Работа с API
const numberBaseUrl = "https://api.tech/numbers/base";
const animalsUrl = "https://animals.tech/";

const getParams = applySpec({
  number: (value) => value,
  from: () => 10,
  to: () => 2,
});
const getResult = compose(String, prop("result"));
const thenGetResult = andThen(getResult);

const getBinaryNumber = compose(api.get(numberBaseUrl), getParams);

const getFullAnimalUrl = concat(animalsUrl);
const thenGetFullUrl = andThen(getFullAnimalUrl);

const getAnimalById = api.get(__, {});
const thenGetAnimalById = andThen(getAnimalById);

const validate = allPass([
  lengthGreaterThenTwo,
  lengthLowerThenTen,
  isPositiveNumber,
]);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  // Вспомогательные функции
  const logAndHandOver = tap(writeLog);
  const thenLogAndHandOver = andThen(logAndHandOver);

  const thenCompleteJob = andThen(handleSuccess);

  const handleValidationError = () => handleError("Validation Error");
  const catchErrorOnPromiseFailure = otherwise(handleError);

  const doJob = compose(
    catchErrorOnPromiseFailure,
    thenCompleteJob,
    thenLogAndHandOver,
    thenGetResult,
    thenGetAnimalById,
    thenGetFullUrl,
    thenStringify,
    thenLogAndHandOver,
    thenGetModuloForThree,
    thenLogAndHandOver,
    thenGetPowSquare,
    thenLogAndHandOver,
    thenGetLength,
    thenLogAndHandOver,
    thenGetResult,
    getBinaryNumber,
    logAndHandOver,
    toInteger
  );

  const checkConditionOnStart = ifElse(validate, doJob, handleValidationError);
  const startProcessing = compose(checkConditionOnStart, logAndHandOver);

  startProcessing(value);
};

export default processSequence;
