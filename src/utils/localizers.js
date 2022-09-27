// "use strict";

// exports.__esModule = true;
// exports.setNumber = setNumber;
// exports.setDate = setDate;
// exports.date = exports.number = void 0;

import invariant from 'invariant';
// var _propTypes = _interopRequireDefault(require("prop-types"));
import propTypes from 'prop-types';

import * as _ from './_';


// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localePropType = propTypes.oneOfType([ propTypes.string, propTypes.func ]);

var REQUIRED_NUMBER_FORMATS = ['default'];
var REQUIRED_DATE_FORMATS = ['default', 'date', 'time', 'header', 'footer', 'weekday', 'dayOfMonth', 'month', 'year', 'decade', 'century'];

const numberLocalizer = createWrapper('NumberPicker');

export const number = {
  propType () {
    return numberLocalizer.propType.apply(numberLocalizer, arguments);
  },

  getFormat (key, format) {
    return format || numberLocalizer.formats[key];
  },

  parse () {
    return numberLocalizer.parse.apply(numberLocalizer, arguments);
  },

  format () {
    return numberLocalizer.format.apply(numberLocalizer, arguments);
  },
  decimalChar () {
    return numberLocalizer.decimalChar.apply(numberLocalizer, arguments);
  },
  precision () {
    return numberLocalizer.precision.apply(numberLocalizer, arguments);
  }
};

export function setNumber({ format, parse, formats, propType = localePropType, decimalChar = () => '.', precision = () => null }) {
  // var format = _ref.format,
  //     _parse = _ref.parse,
  //     formats = _ref.formats,
  //     _ref$propType = _ref.propType,
  //     propType = _ref$propType === void 0 ? localePropType : _ref$propType,
  //     _ref$decimalChar = _ref.decimalChar,
  //     decimalChar = _ref$decimalChar === void 0 ? function () {
  //   return '.';
  // } : _ref$decimalChar,
  //     _ref$precision = _ref.precision,
  //     precision = _ref$precision === void 0 ? function () {
  //   return null;
  // } : _ref$precision;
  checkFormats(REQUIRED_NUMBER_FORMATS, formats);

  numberLocalizer = {
    formats,
    precision,
    decimalChar,
    propType,
    format: wrapFormat(format),
    parse (value, culture, format) {
      var result = parse.call(this, value, culture, format);

      // !(result == null || typeof result === 'number') ? process.env.NODE_ENV !== "production" ? invariant(false, 'number localizer `parse(..)` must return a number, null, or undefined') : invariant(false) : false;

      return result;
    }
  };
}

export let dateLocalizer = createWrapper('DateTimePicker');

export const date = {
  propType () {
    return dateLocalizer.propType.apply(dateLocalizer, arguments);
  },

  getFormat (key, format) {
    return format || dateLocalizer.formats[key];
  },

  parse () {
    return dateLocalizer.parse.apply(dateLocalizer, arguments);
  },

  format () {
    return dateLocalizer.format.apply(dateLocalizer, arguments);
  },

  firstOfWeek () {
    return dateLocalizer.firstOfWeek.apply(dateLocalizer, arguments);
  }
};

export function setDate({ formats, format, parse, firstOfWeek, propType = localePropType }) {
  // var formats = _ref2.formats,
  //     format = _ref2.format,
  //     _parse2 = _ref2.parse,
  //     firstOfWeek = _ref2.firstOfWeek,
  //     _ref2$propType = _ref2.propType,
  //     propType = _ref2$propType === void 0 ? localePropType : _ref2$propType;

  checkFormats(REQUIRED_DATE_FORMATS, formats);

  dateLocalizer = {
    formats,
    propType,
    firstOfWeek,
    format: wrapFormat(format),
    parse: function parse(value, culture) {
      var result = parse.call(this, value, culture);

      // !(result == null || result instanceof Date && !isNaN(result.getTime())) ? process.env.NODE_ENV !== "production" ? invariant(false, 'date localizer `parse(..)` must return a valid Date, null, or undefined') : invariant(false) : false;
      return result;
    }
  };
}

function wrapFormat(formatter) {
  return function (value, format, culture) {
    const result = typeof format === 'function' ? format(value, culture, this) : formatter.call(this, value, format, culture);

    // !(result == null || typeof result === 'string') ? process.env.NODE_ENV !== "production" ? invariant(false, '`localizer format(..)` must return a string, null, or undefined') : invariant(false) : false;

    return result;
  };
}

function checkFormats(required, formats) {
  if (process.env.NODE_ENV !== 'production') required.forEach((f) => {
    return true; // !_.has(formats, f) ? process.env.NODE_ENV !== "production" ? invariant(false, 'localizer missing required format: `%s`', f) : invariant(false) : false;
  });
}

function createWrapper() {
  var dummy = {};

  if (process.env.NODE_ENV !== 'production') {
    ['formats', 'parse', 'format', 'firstOfWeek', 'precision', 'propType'].forEach((name) => {
      return Object.defineProperty(dummy, name, {
        enumerable: true,
        get: function get() {
          throw new Error('[React Widgets] You are attempting to use a widget that requires localization ' + '(Calendar, DateTimePicker, NumberPicker). ' + 'However there is no localizer set. Please configure a localizer. \n\n' + 'see http://jquense.github.io/react-widgets/docs/#/i18n for more info.');
        }
      });
    });
  }

  return dummy;
}