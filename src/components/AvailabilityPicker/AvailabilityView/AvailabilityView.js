import React from 'react';
import PropTypes from 'prop-types'; // use directly
import clsx from 'clsx';

import { withStyles, Theme } from '@material-ui/core/styles';

import { dates } from '../../../utils/dates';
// import { date as dateLocalizer } from '../../../utils/localizers';



// }
// .ap-calendar-grid .ap-cell {
//     width: 40px;
//     height: 40px;
// }
// .ap-cell.ap-state-disabled {
//     color: #999;
//     filter: alpha(opacity=7);
//     opacity: .7;
// }
// .ap-cell, .ap-head-cell {
//     border: 0;
// }
// .ap-cell {
//     color: #333;
//     border-radius: 8px;
//     cursor: pointer;
//     line-height: normal;
//     border: 1px solid transparent;
// }


const styles = ((theme: Theme) => ({
  drawer: {
    display: 'flex',
    width: theme.rightDrawerWidth,
    height: `calc(100% - ${theme.footerHeight}px)`,
  },
  thumbnailContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '5px',
    overflowY: 'auto',
  },
  apNavView: {
    // table {
    borderCollapse: 'collapse',
    // }
  },
  apCalendarGrid: {
    height: 'auto',
    borderCollapse: 'collapse',
  },
  apCalendarRow: {
  // tr {
    borderBottom: '1pt solid #CBCFD5',
  // }
  },
  apHeadCell: {
    fontFamily: "'Poppins', Arial, sans-serif",
    fontWeight: 400,
    fontSize: '12px',
    textAlign: 'center',
    textTransform: 'uppercase',
    color: '#6b7178',
    // .ap-cell, .ap-head-cell {
    // text-align: center;
    padding: 0,
    border: 0,
    paddingBottom: '10px',
    // }
  },
  apCell: {
    width: '40px',
    height: '40px',
    color: '#333',
    padding: '3px', // '9px 8px',
    borderRadius: '8px',
    cursor: 'pointer',
    lineHeight: 'normal',
    border: '1px solid transparent',
    textAlign: 'center',
  },
  apBtn: {
    position: 'relative',
    // margin: '0 auto',
    // borderRadius: '4px',
    borderRadius: '50%',
    // lineHeight: '24px',
    width: '44px',
    height: '44px',
    // margin: '4px auto',
    // padding: '10px 8px',
    padding: '8px',
    fontSize: '14px',
    fontWeight: '400',
    lineHeight: '26px',
    letterSpacing: 'normal',
    fontFamily: '"Poppins",sans-serif',
    border: '1px solid transparent',
    "&:hover": {
      backgroundColor: theme.greyLight,
      border: '1px solid #CBCFD5',
    },
  },
  apTimeSlotBtn: {
    position: 'relative',
    // margin: '0 auto',
    // borderRadius: '4px',
    borderRadius: '8px',
    // lineHeight: '24px',
    // width: '44px',
    height: '60px',
    // margin: '4px auto',
    // padding: '10px 8px',
    padding: '8px',
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '18px',
    letterSpacing: 'normal',
    fontFamily: '"Poppins",sans-serif',
    border: '1px solid transparent',
    /* .tbk-grey-light */

    background: '#F8F8F8',
    borderRadius: '8px',

    /* Inside auto layout */

    // flex: 'none',
    // order: 0,
    // alignSelf: 'stretch',
    flexGrow: 1,
    userSelect: 'none',
    cursor: 'pointer',
    "&:hover": {
      backgroundColor: theme.greyLight,
      border: '1px solid #CBCFD5',
    },
  },
  // apBtn: {

  // },
  apStateDisabled: {
    color: '#999',
    filter: 'alpha(opacity=7)',
    opacity: '.7',
  },
  apStateSelected: {
    background: theme.greyLight, // #F8F8F8
    border: '1px solid #CBCFD5',
  },
  apCellOffRange: {
    color: '#999',
    "& :hover": {
      backgroundColor: 'transparent',
      borderColor: 'transparent',
    }
  },
  apStateHasBooking: {
    "& div": {
      "&:after": {

      content: ' ',
      display: 'block',
      width: '4px',
      height: '4px',
      backgroundColor: 'red',
      position: 'absolute',
      }
    }
  },
  apBtnHasBooking: {
    // content: ' ',
    display: 'block',
    width: '4px',
    height: '4px',
    backgroundColor: theme.red,
    borderRadius: '50%',
    position: 'absolute',
    left: '50%',
    transform: 'translate(-2px, 0)',

  },
  apTSStateSelected: {
    backgroundColor: theme.red,
    color: theme.whiteBasic,
  },

  apTSStateUnavailable: {
    backgroundColor: theme.grey,
    color: theme.whiteBasic,
    "& :hover": {
      backgroundColor: theme.grey,
      color: theme.whiteBasic,
    }
  },
  // apBtn: {

// .rw-btn, .rw-filter-input, .rw-input, .rw-input-reset {
//     color: inherit;
//     padding: 0;
//     margin: 0;
//     border: none;
//     box-shadow: none;
//     background: none;
//     background-image: none;
//     font-family: inherit;
//     font-size: inherit;
//     line-height: inherit;
//     -ms-touch-action: manipulation;
//     touch-action: manipulation;
// }
  // },
  apNow: {
    color: theme.red,
  }
}));

const VIEW_UNITS = ['month', 'year', 'decade', 'century'];

function clamp(date, min, max){
  return dates.max(dates.min(date, max), min)
}

// Is AvailabilityDatePickerView extraneous?
class AvailabilityView extends React.Component {
  render() {
    let { className } = this.props;

    return (
      <table
        {...this.props}
        role='grid'
        tabIndex='-1'
        className={clsx(
          className,
          'ap-nav-view',
          'ap-calendar-grid'
        )}
      />
    )
  }
}


class AvailabilityViewCell extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    selected: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.bool]),
    focused: PropTypes.instanceOf(Date),
    date: PropTypes.instanceOf(Date),
    now: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    /**
     * The day of month for the first (inclusive) enabled day.
     */
    enabledDayStart: PropTypes.number,
    /**
     * The day of month for the last (inclusive) enabled day.
     */
    enabledDayEnd: PropTypes.number,
    hasBooking: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
    viewUnit: PropTypes.oneOf(VIEW_UNITS),
    onChange: PropTypes.func, //.isRequired
  };

  isEqual(date) {
    return dates.eq(this.props.date, date, this.props.unit)
  }

  isEmpty() {
    let { unit, min, max, date } = this.props;
    return !dates.inRange(date, min, max, unit)
  }

  isNow() {
    return this.isEqual(this.props.now)
  }

  isFocused() {
    return this.isEqual(this.props.focused)
  }

  isSelected() {
    return this.isEqual(this.props.selected)
  }

  isOffView() {
    let { viewUnit, focused, date } = this.props;
    return viewUnit && dates[viewUnit](date) !== dates[viewUnit](focused);
  }

  // isDayEnabled(day: number) {
  //   return day >= enabledDayStart && day <= enabledDayEnd;
  // }

  hasBooking() {
    return this.props.hasBooking;
  }

  isHighlighted() {
    return this.props.isHighlighted;
  }

  handleChange = () => {
    let { onChange, min, max, date } = this.props;
    // onChange(clamp(date, min, max));
    onChange(date);
  }

  render()  {
    let { children, id, label, disabled } = this.props;

    // if (this.isEmpty()) {
    //   return <td className='ap-empty-cell' role='presentation'>&nbsp;</td>
    // }

    return (
      <td
        role='gridcell'
        id={id}
        title={label}
        aria-label={label}
        aria-readonly={disabled}
        aria-selected={this.isSelected()}
        className={clsx(
            'ap-grid-cell',
            // this.props.className,
            this.props.classes.apCell,
            this.isOffView() && this.props.classes.apCellOffRange, //'ap-off-range',
            this.isFocused() && this.props.classes.apStateFocused, //'ap-state-focus',
            this.isSelected() && this.props.classes.apStateSelected, // && this.props.classes.apStateDisabled, //'ap-state-selected',
            // this.hasBooking() && this.props.classes.apStateHasBooking, // && this.props.classes.apStateDisabled, //'ap-state-selected',
            this.isEmpty() && 'ap-empty-cell'
          )}
        style={this.props.style}
      >
        <div
          aria-labelledby={id}
          onClick={this.handleChange}
          className={clsx(
            'ap-btn',
            this.props.classes.apBtn,
            // this.isSelected() && this.props.classes.apStateSelected,
            this.isSelected() || this.isHighlighted() && this.props.classes.apStateSelected,
            this.isNow() && this.props.classes.apNow //'ap-now'
          )}
        >
          {children}
          {this.hasBooking() && (<div className={this.props.classes.apBtnHasBooking} />)}
        </div>
      </td>
    )
  }
}

class AvailabilityViewTimeSlot extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    selected: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.bool]),
    focused: PropTypes.instanceOf(Date),
    date: PropTypes.instanceOf(Date),
    now: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    /**
     * The day of month for the first (inclusive) enabled day.
     */
    enabledDayStart: PropTypes.number,
    /**
     * The day of month for the last (inclusive) enabled day.
     */
    enabledDayEnd: PropTypes.number,
    hasBooking: PropTypes.bool,
    isHighlighted: PropTypes.bool,
    unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
    viewUnit: PropTypes.oneOf(VIEW_UNITS),
    // date={v.date}
    slotType: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  isEqual(date) {
    return dates.eq(this.props.date, date, this.props.unit)
  }

  isEmpty() {
    let { unit, min, max, date } = this.props;
    return !dates.inRange(date, min, max, unit)
  }

  isNow() {
    return this.isEqual(this.props.now)
  }

  isFocused() {
    return this.isEqual(this.props.focused)
  }

  isSelected() {
    return this.isEqual(this.props.selected)
  }

  isOffView() {
    let { viewUnit, focused, date } = this.props;
    return viewUnit && dates[viewUnit](date) !== dates[viewUnit](focused);
  }

  // isDayEnabled(day: number) {
  //   return day >= enabledDayStart && day <= enabledDayEnd;
  // }

  hasBooking() {
    return this.props.hasBooking;
  }

  isHighlighted() {
    return this.props.isHighlighted;
  }

  handleChange = () => {
    let { onChange, min, max, date } = this.props;
    onChange(clamp(date, min, max));
  }

  handleClick = () => {
    let { date, onClick } = this.props;
    onClick(date);
  }

  render()  {
    let { children, id, label, disabled } = this.props;

    // if (this.isEmpty()) {
    //   return <td className='ap-empty-cell' role='presentation'>&nbsp;</td>
    // }

      {/*<td
        role='gridcell'
        id={id}
        title={label}
        aria-label={label}
        aria-readonly={disabled}
        aria-selected={this.isSelected()}
        className={clsx(
            'ap-grid-cell',
            // this.props.className,
            this.props.classes.apCell,
            this.isOffView() && this.props.classes.apCellOffRange, //'ap-off-range',
            this.isFocused() && this.props.classes.apStateFocused, //'ap-state-focus',
            this.isSelected() && this.props.classes.apStateSelected, // && this.props.classes.apStateDisabled, //'ap-state-selected',
            // this.hasBooking() && this.props.classes.apStateHasBooking, // && this.props.classes.apStateDisabled, //'ap-state-selected',
            this.isEmpty() && 'ap-empty-cell'
          )}
        style={this.props.style}
      >*/}
      {/*</td>*/}
    return (
        <td
          aria-labelledby={id}
          onClick={this.handleClick}
          className={clsx(
            'ap-btn',
            this.props.classes.apTimeSlotBtn,
            (this.props.slotType === 'IN_SESSION' ||
              this.props.slotType === 'AVAILABLE') && this.props.classes.apTSStateSelected,
            (this.props.slotType === 'IS_NOT_AVAILABLE_FOR_BOOKING') && this.props.classes.apTSStateUnavailable,
            // this.isSelected() && this.props.classes.apStateSelected,
            // this.isSelected() || this.isHighlighted() && this.props.classes.apStateSelected,
            // this.isNow() && this.props.classes.apNow //'ap-now'
          )}
        >
          {children}
          {/*{this.props.slotType}*/}
          {/*{this.hasBooking() && (<div className={this.props.classes.apBtnHasBooking} />)}*/}
        </td>
    )
  }
}

AvailabilityView.Row = props => <tr role='row' {...props} />;
AvailabilityView.Cell = withStyles(styles)(AvailabilityViewCell);
AvailabilityView.TimeSlot = withStyles(styles)(AvailabilityViewTimeSlot);

export default AvailabilityView; //CalendarView;
