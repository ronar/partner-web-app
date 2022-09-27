import * as dateArithmetic from 'date-arithmetic';
import * as localizers from './localizers';

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

export const dates = {
  ...dateArithmetic,
  monthsInYear (year) {
    var date = new Date(year, 0, 1);
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(function (i) {
      return dates.month(date, i);
    });
  },

  firstVisibleDay (date, culture) {
    var firstOfMonth = dates.startOf(date, 'month');
    return dates.startOf(firstOfMonth, 'week', localizers.date.firstOfWeek(culture));
  },

  lastVisibleDay (date, culture) {
    var endOfMonth = dates.endOf(date, 'month');
    return dates.endOf(endOfMonth, 'week', localizers.date.firstOfWeek(culture));
  },

  visibleDays (date, culture) {
    var current = dates.firstVisibleDay(date, culture);
    var last = dates.lastVisibleDay(date, culture);
    var days = [];

    while (dates.lte(current, last, 'day')) {
      days.push(current);
      current = dates.add(current, 1, 'day');
    }

    return days;
  },

  merge (date, time, defaultDate) {
    if (time == null && date == null) return null;
    if (time == null) time = defaultDate || new Date();
    if (date == null) date = defaultDate || new Date();
    date = dates.startOf(date, 'day');
    date = dates.hours(date, dates.hours(time));
    date = dates.minutes(date, dates.minutes(time));
    date = dates.seconds(date, dates.seconds(time));
    return dates.milliseconds(date, dates.milliseconds(time));
  },

  today () {
    return dates.startOf(new Date(), 'day');
  },

  tomorrow () {
    return dates.add(dates.startOf(new Date(), 'day'), 1, 'day');
  }
};

// var _default = dates;
// exports.default = _default;
// module.exports = exports["default"];