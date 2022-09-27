/*
 * Day Picker View!!!!!!!!!!!
 * Wrapper for containing months and do all the logic
 *
 * Created by Vladimir Shishlyannikov on 24/09/2022.
 * Copyright (c) 2022 iWoo Ltd. All rights reserved.
 */



import React from 'react';
import PropTypes from 'prop-types'; // use directly
import clsx from 'clsx';

import { withStyles, Theme } from '@material-ui/core/styles';

import { dates } from '../../../utils/dates';

import Header from '../Header/Header';
import Month from '../Month/Month';
import { date as dateLocalizer } from '../../../utils/localizers';
import { _ } from '../../../utils/_';



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
var MONTH1    = 'month1',
  MONTH2 = 'month2',
  MONTH3 = 'month3';

function clamp(date, min, max){
  return dates.max(dates.min(date, max), min)
}

class AvailabilityDatePickerView extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    selected: PropTypes.instanceOf(Date),
    focused: PropTypes.instanceOf(Date),
    dayAvailability: PropTypes.arrayOf(PropTypes.object),
    date: PropTypes.instanceOf(Date),
    now: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
    viewUnit: PropTypes.oneOf(VIEW_UNITS),
    currentDate: PropTypes.instanceOf(Date),
    onDaySelected: PropTypes.func.isRequired,
    // onChange: PropTypes.func, //.isRequired
  };

  // month params

  // month, year, mFirstDayOfWeek, enabledDayRangeStart, enabledDayRangeEnd, selectedDay[0], selectedDay[1]

  constructor(props) {
    super(props);

    // Set up min and max dates.
    let minDate = dates.today(); // new Date();
    let maxDate = dates.today(); // new Date();

    dates.add(maxDate, 3, 'month');
    // final Calendar tempDate = Calendar.getInstance();
    // final long minDateMillis = tempDate.getTimeInMillis();
    // final long maxDateMillis = tempDate.getTimeInMillis();

    this.handleDaySelected = this.handleDaySelected.bind(this);
    const format = dateLocalizer.getFormat('header', 'YYYY-MM'/*headerFormat*/);

    this.state = {
      monthViews: {
        [dateLocalizer.format(minDate, format, props.culture)]: {
          minDate: dates.startOf(minDate, 'month'),
          maxDate: dates.endOf(minDate, 'month'),
          year: dates.year(minDate),
          month: dates.month(minDate) + 1,
          hasBookingsDays: [],
          highlightedDays: [],
          hoursCount: 0
        },
        [dateLocalizer.format(dates.add(minDate, 1, 'month'), format, props.culture)]: {
          minDate: dates.startOf(dates.add(minDate, 1, 'month'), 'month'),
          maxDate: dates.endOf(dates.add(minDate, 1, 'month'), 'month'),
          year: dates.year(dates.add(minDate, 1, 'month')),
          month: dates.month(dates.add(minDate, 1, 'month')) + 1,
          hasBookingsDays: [],
          highlightedDays: [],
          hoursCount: 0
        },
        [dateLocalizer.format(dates.add(minDate, 2, 'month'), format, props.culture)]: {
          minDate: dates.startOf(dates.add(minDate, 2, 'month'), 'month'),
          maxDate: dates.endOf(dates.add(minDate, 2, 'month'), 'month'),
          year: dates.year(dates.add(minDate, 2, 'month')),
          month: dates.month(dates.add(minDate, 2, 'month')) + 1,
          hasBookingsDays: [],
          highlightedDays: [],
          hoursCount: 0
        }
      },
      minDate,
      maxDate,
    };
  }

  getCurrentDate(): Date {
     return this.props.currentDate || this.props.value || new Date();
  }

  handleDaySelected(day: Date) {
    // mCurrentDate = day;
    // this.setState({ currentDate: day });

    const year = dates.year(day); // currentDate.year();

    // if (callbackToClient && mDateChangedListener != null) {
    //     mDateChangedListener.onDateChanged(this, day);
    // }

    // mDayPickerView.setDate(day, false);

    this.setState({ selectedDay: day });

    // Passthrough to the parent
    this.props.onDaySelected(day);

    // onCurrentDateChanged(fromUser);
  }

  onDateChanged(view/* AvailabilityDatePicker  */, selectedDate: Date) {
        // Context context = getContext();

        // We get here after seleting a date
        // mDatePicker.init(selectedDate,this);

        // mTimePicker.setCurrentDay(selectedDate);

        // mTimePickerGridView.setVisibility(View.INVISIBLE);
        // mSlidingUpPanelLayout.setPanelState(TBSlidingUpPanelLayout.PanelState.ANCHORED);

  }

  getHeaderLabel(monthIndex): string {
    let { culture, headerFormat } = this.props,
      currentDate = dates.add(this.state.minDate, monthIndex, 'month');// this.getCurrentDate();

    headerFormat = dateLocalizer.getFormat('header', 'MMMM'/*headerFormat*/);
        // headerFormat = headerFormat || 'MMMM YYYY';

        // if (['LEFT', 'RIGHT'].indexOf(direction) !== -1) {
        //     let method = direction === 'LEFT' ? 'subtract' : 'add';

        //     return dateLocalizer.format(dates[method](this.getCurrentDate(), 1, this.state.view), headerFormat, culture);
        // }

    return dateLocalizer.format(currentDate, headerFormat, culture);
  }

  componentDidUpdate(prevProps) {
    if (!_.isShallowEqual(prevProps.dayAvailability, this.props.dayAvailability)) {
      if (this.props.dayAvailability) {
        this.props.dayAvailability.forEach(da => {
          // const dayFormat = dateLocalizer.getFormat('header', 'YYYY-MM-DD'/*headerFormat*/);
                    // SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

          const [ year, month, day ] = da.day.split('-');

          const monthView = this.state.monthViews[`${year}-${month}`];

          // try {
          //     tempDate.setTime(sdf.parse(da.getDay()));// all done
          // } catch (ParseException e) {
          //     e.printStackTrace();
          // }

          // int month = tempDate.get(Calendar.MONTH);
          let slotType: string;

          if (month == monthView.month) {
            let hasSetAvailableDays: boolean = false;
            let hasBookings: boolean = false;

            da.timeSlots.forEach(ts => {
              const slotType = ts.slotType;

                if (slotType === 'AVAILABLE') {
                  hasSetAvailableDays = true;
                  monthView.hoursCount += 0.5;
                }

                if (slotType === 'IN_SESSION') {
                  hasBookings = true;
                }
            });

            if (hasSetAvailableDays) {
              monthView.highlightedDays[Number(day) - 1] = 1;
            }

            if (hasBookings) {
              monthView.hasBookingsDays[Number(day) - 1] = 1;
            }
          }
        });
      }
    }
  }

  render() {
    let { className, value, todaysDate, disabled, currentDate, } = this.props;
    let { minDate, maxDate } = this.state;

    return (
      <div>
        {Object.keys(this.state.monthViews).map((key, index) => (
          <>
          <Header
              // // isRtl={this.isRtl()}
              label={this.getHeaderLabel(index)}
              daysCountLabel={this.state.monthViews[key].highlightedDays.length}
              hoursCountLabel={Math.floor(this.state.monthViews[key].hoursCount)}
              // prevLabel={this.getHeaderLabel('LEFT')}
              // nextLabel={this.getHeaderLabel('RIGHT')}
              // labelId={this.labelId}
              // messages={this.messages}
              // // upDisabled={isDisabled || view === last(views)}
              // prevDisabled={isDisabled || !dates.inRange(this.nextDate('LEFT'), min, max, view)}
              // nextDisabled={isDisabled || !dates.inRange(this.nextDate('RIGHT'), min, max, view)}
              // onViewChange={this.handleViewChange}
              // onMoveLeft ={this.handleMoveBack}
              // onMoveRight={this.handleMoveForward}
          />
          <Month
              // {...viewProps}
              // key={key}
              key={key}
              // id={this.viewId}
              // activeId={this.activeId}
              value={value}
              today={todaysDate}
              minDate={this.state.monthViews[key].minDate}
              maxDate={this.state.monthViews[key].minDate}
              disabled={disabled}
              hasBookingsDays={this.state.monthViews[key].hasBookingsDays}
              highlightedDays={this.state.monthViews[key].highlightedDays}
              // prevDisabled={isDisabled || !dates.inRange(this.nextDate('LEFT'), min, max, 'week')}
              // nextDisabled={isDisabled || !dates.inRange(this.nextDate('RIGHT'), min, max, 'week')}
              focused={currentDate}
              dayFormat={'dd'}
              onChange={this.handleDaySelected}
              // aria-labelledby={this.labelId}
              // onMoveLeft ={this.handleMoveBack}
              // onMoveRight={this.handleMoveForward}
          />
          </>
        ))}
      </div>
    );
  }

  handleChange (date: Date) {
    return null;
  }
}


// class AvailabilityViewCell extends React.Component {
//   static propTypes = {
//     classes: PropTypes.object.isRequired,
//     style: PropTypes.object,
//     id: PropTypes.string,
//     label: PropTypes.string,
//     today: PropTypes.instanceOf(Date),
//     disabled: PropTypes.bool,
//     selected: PropTypes.instanceOf(Date),
//     focused: PropTypes.instanceOf(Date),
//     date: PropTypes.instanceOf(Date),
//     now: PropTypes.instanceOf(Date),
//     min: PropTypes.instanceOf(Date),
//     max: PropTypes.instanceOf(Date),
//     unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
//     viewUnit: PropTypes.oneOf(VIEW_UNITS),
//     onChange: PropTypes.func, //.isRequired
//   };

//   isEqual(date) {
//     return dates.eq(this.props.date, date, this.props.unit)
//   }

//   isEmpty() {
//     let { unit, min, max, date } = this.props;
//     return !dates.inRange(date, min, max, unit)
//   }

//   isNow() {
//     return this.isEqual(this.props.now)
//   }

//   isFocused() {
//     return this.isEqual(this.props.focused)
//   }

//   isSelected() {
//     return this.isEqual(this.props.selected)
//   }

//   isOffView() {
//     let { viewUnit, focused, date } = this.props;
//     return viewUnit && dates[viewUnit](date) !== dates[viewUnit](focused);
//   }

//   handleChange = () => {
//     let { onChange, min, max, date } = this.props;
//     onChange(clamp(date, min, max));
//   }

//   render()  {
//     let { children, id, label, disabled } = this.props;

//     // if (this.isEmpty()) {
//     //   return <td className='ap-empty-cell' role='presentation'>&nbsp;</td>
//     // }

//     return (
//       <td
//         role='gridcell'
//         id={id}
//         title={label}
//         aria-label={label}
//         aria-readonly={disabled}
//         aria-selected={this.isSelected()}
//         className={clsx(
//             'ap-grid-cell',
//             // this.props.className,
//             this.props.classes.apCell,
//             this.isOffView() && this.props.classes.apCellOffRange, //'ap-off-range',
//             this.isFocused() && this.props.classes.apStateFocused, //'ap-state-focus',
//             this.isSelected() && this.props.classes.apStateSelected, // && this.props.classes.apStateDisabled, //'ap-state-selected',
//             this.isEmpty() && 'ap-empty-cell'
//           )}
//         style={this.props.style}
//       >
//         <div
//           aria-labelledby={id}
//           onClick={this.handleChange}
//           className={clsx(
//             'ap-btn',
//             this.props.classes.apBtn,
//             this.isSelected() && this.props.classes.apStateSelected,
//             this.isNow() && this.props.classes.apNow //'ap-now'
//           )}
//         >
//           {children}
//         </div>
//       </td>
//     )
//   }
// }

// AvailabilityView.Row = props => <tr role='row' {...props} />;
// AvailabilityView.Cell = withStyles(styles)(AvailabilityViewCell);

export default AvailabilityDatePickerView; //CalendarView;
