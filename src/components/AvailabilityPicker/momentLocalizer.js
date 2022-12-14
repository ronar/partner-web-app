// "use strict";

// exports.__esModule = true;
// exports.default = momentLocalizer;

import moment from 'moment';
import configure from './configure';

// var _moment = _interopRequireDefault(require("moment"));

// var _configure = _interopRequireDefault(require("react-widgets/lib/configure"));

// function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof moment !== 'function') throw new TypeError('You must provide a valid moment object');

var localField = typeof moment().locale === 'function' ? 'locale' : 'lang',
    hasLocaleData = !!moment.localeData;
if (!hasLocaleData) throw new TypeError('The Moment localizer depends on the `localeData` api, please provide a moment object v2.2.0 or higher');

function getMoment(culture, value, format) {
  return culture ? moment(value, format, true)[localField](culture) : moment(value, format, true);
}

function endOfDecade(date) {
  return moment(date).add(10, 'year').add(-1, 'millisecond').toDate();
}

function endOfCentury(date) {
  return moment(date).add(100, 'year').add(-1, 'millisecond').toDate();
}

export default function momentLocalizer() {
  var localizer = {
    formats: {
      date: 'L',
      time: 'LT',
      default: 'lll',
      header: 'MMMM YYYY',
      footer: 'LL',
      weekday: 'dd',
      dayOfMonth: 'DD',
      month: 'MMM',
      year: 'YYYY',
      decade: function decade(date, culture, localizer) {
        return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfDecade(date), 'YYYY', culture);
      },
      century: function century(date, culture, localizer) {
        return localizer.format(date, 'YYYY', culture) + ' - ' + localizer.format(endOfCentury(date), 'YYYY', culture);
      }
    },
    firstOfWeek: function firstOfWeek(culture) {
      return moment.localeData(culture).firstDayOfWeek();
    },
    parse: function parse(value, format, culture) {
      if (!value) return null;
      var m = getMoment(culture, value, format);
      if (m.isValid()) return m.toDate();
      return null;
    },
    format: function format(value, _format, culture) {
      return getMoment(culture, value).format(_format);
    }
  };

  configure.setDateLocalizer(localizer);
}

// module.exports = exports["default"];
