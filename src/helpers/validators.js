/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
  countBy,
  identity,
  values,
  allPass,
  complement,
  compose,
  equals,
  prop,
  gte,
  __,
  any,
  omit,
} from "ramda";

const isRed = equals("red");
const isGreen = equals("green");
const isBlue = equals("blue");
const isOrange = equals("orange");
const isWhite = equals("white");

const isNotRed = complement(isRed);
const isNotWhite = complement(isWhite);

const getStar = prop("star");
const getTriangle = prop("triangle");
const getSquare = prop("square");
const getCircle = prop("circle");

const isRedStar = compose(isRed, getStar);
const isGreenStar = compose(isGreen, getStar);
const isOrangeStar = compose(isOrange, getStar);
const isNotRedStar = compose(isNotRed, getStar);
const isNotWhiteStar = compose(isNotWhite, getStar);

const isGreenSquare = compose(isGreen, getSquare);
const isOrangeSquare = compose(isOrange, getSquare);

const isWhiteTriangle = compose(isWhite, getTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);
const isOrangeTriangle = compose(isOrange, getTriangle);

const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);
const isGreenCircle = compose(isGreen, getCircle);
const isOrangeCircle = compose(isOrange, getCircle);

const getColorCounts = compose(countBy(identity), values);
const getColorCountsExceptWhite = compose(omit(["white"]), getColorCounts);

const isRedEqualsBlue = ({ red, blue }) => red === blue;
const isTwoOrMoreGreen = ({ green }) => green >= 2;
const isTwoGreen = ({ green }) => green === 2;
const isOneOrMoreRed = ({ red }) => red >= 1;

const isTriangleEqualsSquare = ({ square, triangle }) => square === triangle;

const isAnyGreaterThenThree = any(gte(__, 3));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  isRedStar,
  isGreenSquare,
  isWhiteCircle,
  isWhiteTriangle,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(isTwoOrMoreGreen, getColorCounts);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(isRedEqualsBlue, getColorCounts);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isBlueCircle,
  isRedStar,
  isOrangeSquare,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
  isAnyGreaterThenThree,
  values,
  getColorCountsExceptWhite
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  compose(isTwoGreen, getColorCounts),
  compose(isOneOrMoreRed, getColorCounts),
  isGreenTriangle,
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allPass([
  isOrangeSquare,
  isOrangeCircle,
  isOrangeStar,
  isOrangeTriangle,
]);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([
  isGreenCircle,
  isGreenSquare,
  isGreenStar,
  isGreenTriangle,
]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([isTriangleEqualsSquare]);
