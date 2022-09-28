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

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

import SquaresIcon from '../../../icons/SquaresIcon';
import SquaresOIcon from '../../../icons/SquaresOIcon';
import CheckBoxIcon from '../../../icons/CheckBoxIcon';
import CloseIcon from '../../../icons/Close2Icon';

import { withStyles, Theme } from '@material-ui/core/styles';

import AvailabilityView from '../AvailabilityView/AvailabilityView'; // './CalendarCell';

import { TimeSlot } from '../../../types';
import { dates } from '../../../utils/dates';
import { _ } from '../../../utils/_';

// import Header from '../Header/Header';
import Month from '../Month/Month';
import { date as dateLocalizer } from '../../../utils/localizers';



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
  apTimeListHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '26px',
    color: '#303740',
    // padding: 0,
    padding: '0 8px',
    marginBottom: '32px',
    // fontSize: '13px',
    // fontWeight: 500,
    // lineHeight: '16px',
    // color: '#fff',
    textTransform: 'uppercase',
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
  apTimesList: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingLeft: 0,
    listStyle: 'none',
    // flexDirection: 'column',
    gap: '10px',
  },
  apTimeSlotsTable: {
    borderSpacing: '6px',
    marginBottom: '80px'
  },
  apTimesRow: {

  },
  apTimeSlot: {
    userSelect: 'none',
  },
  gutterBottom: {
    paddingBottom: '24px',
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
  },

  buttonsDuet: {
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
    // background: 'transparent',
    border: '0',
    // padding: '0',
    backgroundColor: theme.greyLight, //'#ffffff',
    padding: '8px 16px',
    borderRadius: 8
  },
}));

const VIEW_UNITS = ['month', 'year', 'decade', 'century'];
var MONTH1    = 'month1',
  MONTH2 = 'month2',
  MONTH3 = 'month3';

function clamp(date, min, max){
  return dates.max(dates.min(date, max), min)
}

class AvailabilityTimePickerView extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    style: PropTypes.object,
    id: PropTypes.string,
    label: PropTypes.string,
    today: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    selected: PropTypes.instanceOf(Date),
    focused: PropTypes.instanceOf(Date),
    date: PropTypes.instanceOf(Date),
    now: PropTypes.instanceOf(Date),
    min: PropTypes.instanceOf(Date),
    max: PropTypes.instanceOf(Date),
    unit: PropTypes.oneOf(['day', ...VIEW_UNITS]),
    viewUnit: PropTypes.oneOf(VIEW_UNITS),
    currentDate: PropTypes.instanceOf(Date),
    selectedDay: PropTypes.instanceOf(Date),
    dayAvailability: PropTypes.arrayOf(PropTypes.object),
    // onDaySelected: PropTypes.func.isRequired,
    // onChange: PropTypes.func, //.isRequired
    onClose: PropTypes.func,
    onConfirm: PropTypes.func.isRequired,
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

    this.handleTimeSlotSelected = this.handleTimeSlotSelected.bind(this);
    this.selectAllTimeSlots = this.selectAllTimeSlots.bind(this);
    this.clearAllTimeSlots = this.clearAllTimeSlots.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

    const timeSlots = this.populateTimeSlots();

    this.state = {
      // monthViews: [MONTH1, MONTH2, MONTH3],
      minDate,
      maxDate,
      timeSlots,
      isAllDay: this.allDaySelected(timeSlots),
    };
  }

  populateTimeSlots() {
    if (!this.props.selectedDay) {
      return [];
    }

    return this.props.dayAvailability.reduce((acc, val) => {
      // val.//forEach(e => acc += (acc ? '&': '') + key + '=' + e);


      const tsFormat = dateLocalizer.getFormat('header', 'YYYY-MM-DD'/*headerFormat*/);
        // headerFormat = headerFormat || 'MMMM YYYY';

        // if (['LEFT', 'RIGHT'].indexOf(direction) !== -1) {
        //     let method = direction === 'LEFT' ? 'subtract' : 'add';

        //     return dateLocalizer.format(dates[method](this.getCurrentDate(), 1, this.state.view), headerFormat, culture);
        // }

      const dateStr = dateLocalizer.format(this.props.selectedDay, 'YYYY-MM-DD', this.props.culture);
      // const selectedDay = dates.date(this.props.selectedDay);
      // const selectedMonth = dates.month(this.props.selectedDay);
      // const selectedYear = dates.year(this.props.selectedDay);

      if (val.day === dateStr) {
        acc = val.timeSlots.map(ts => {
          const [ startHours, startMinutes ] = ts.startTime.split(':')
          const [ endHours, endMinutes ] = ts.endTime.split(':')

          let start = dates.startOf(this.props.selectedDay);

          start = dates.hours(start, Number(startHours));
          start = dates.minutes(start, Number(startMinutes));

          let end = dates.startOf(this.props.selectedDay);

          end = dates.hours(end, Number(endHours));
          end = dates.minutes(end, Number(endMinutes));

          return {
            ...ts,
            start,
            end,
          }
        });
      }

      return acc;
    }, []);
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
    // onDaySelected(day);

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

    headerFormat = dateLocalizer.getFormat('header', 'dddd'/*headerFormat*/);
        // headerFormat = headerFormat || 'MMMM YYYY';

        // if (['LEFT', 'RIGHT'].indexOf(direction) !== -1) {
        //     let method = direction === 'LEFT' ? 'subtract' : 'add';

        //     return dateLocalizer.format(dates[method](this.getCurrentDate(), 1, this.state.view), headerFormat, culture);
        // }

    return dateLocalizer.format(this.props.selectedDay /*currentDate*/, headerFormat, culture);
  }

  getDates (props = this.props) {
    var times = [];
    var value = props.value || props.currentDate || dates.today();
    var values = this.getBounds(props);
    var minTime = this.props.minTime;
    var timezoneOffset = values.min.getTimezoneOffset();
    // var start = values.min; // dates.add(values.min, timezoneOffset, 'minutes'); // Normalize min time according to the time zone
    const selectedDay = props.selectedDay;
    var start = dates.startOf(selectedDay, 'day');
    var startDay = dates.date(selectedDay); // get day

    start = dates.add(start, 330, 'minutes');

    while (dates.date(start) === startDay && dates.lte(start, dates.add(dates.endOf(start, 'day'),　-30 /* 23 hr is the max available time */, 'minutes'))) {
        let found = null;
        let disabled = false;

        if (!this.state.timeSlots || !this.state.timeSlots.length) {
            disabled = true;
        } else {
            // We check only hours and then merge date and time in DateTimePicker
            found = this.state.timeSlots.find(slot => {
                return dates.hours(start) === dates.hours(slot.start) && dates.minutes(start) === dates.minutes(slot.start);
            });

            disabled = !found;
        }

        // let noon = dates.add(dates.startOf(start, 'day'), 810, 'minutes'); // 13:30
        // let evening = dates.add(dates.startOf(start, 'day'), 1110, 'minutes'); // 18:30

        // if (this.checkTimeZoneShift(start, values.min, values.max, timezoneOffset)) {
        times.push({
            date: start,
            disabled: disabled || found && dates.eq(found.date, new Date(), 'day') && dates.lte(start, new Date()),
            slotType: found && found.slotType,
            label: dateLocalizer.format(start, 'HH:mm'/*format(props)*/, props.culture),
            // dayPart: dates.lte(start, noon) ? 'morning' : (dates.gt(start, noon) && dates.lt(start, evening) ? 'afternoon' : 'evening'),
        });

        start = dates.add(start, props.step || 30, 'minutes');
    }

    return times;
  }

  getBounds (props) {
    var value = props.value || props.currentDate || dates.today(),
        useDate = props.preserveDate,
        min = props.min,
        max = props.max,
        start,
        end;

    //compare just the time regradless of whether they fall on the same day
    // if (!useDate) {
    //     start = dates.startOf(
    //         dates.merge(new Date(), min, props.currentDate),
    //         'minutes'
    //     );

    //     end = dates.startOf(
    //         dates.merge(new Date(), max, props.currentDate),
    //         'minutes'
    //     );

    //     if (dates.lte(end, start) && dates.gt(max, min, 'day'));

    //     end = dates.tomorrow();

    //     return {
    //         min: start,
    //         max: end,
    //     };
    // }

    start = dates.today();
    end = dates.tomorrow();

    //date parts are equal
    return {
        min: dates.eq(value, min, 'day')
            ? dates.merge(start, min, props.currentDate)
            : start,
        max: dates.eq(value, max, 'day')
            ? dates.merge(start, max, props.currentDate)
            : end,
    };
  }

  componentDidUpdate(prevProps, prevState) {

    // if (!_.isShallowEqual(prevProps.dayAvailability, this.props.dayAvailability)) {
    if (!prevProps.selectedDay && this.props.selectedDay ||
      prevProps.selectedDay && this.props.selectedDay && prevProps.selectedDay.getTime() !== this.props.selectedDay.getTime()) {
      this.setState({ timeSlots: this.populateTimeSlots() });
    }
  }

  allDaySelected(timeSlots = this.state.timeSlots) {
    return !!(timeSlots && !timeSlots.some(ts => ts.slotType === 'UNAVAILABLE'));
  }

  render() {
    let { className, value, todaysDate, disabled, currentDate, } = this.props;
    let { minDate, maxDate } = this.state;

    let dates = this.getDates();

    let rows: any = _.chunk(dates, 6);

    return (
      <div style={{ overflow: 'scroll', height: '100%', padding: '24px 16px', backgroundColor: 'white', borderRadius: '8px' }}>
        {/*<Header
            // // isRtl={this.isRtl()}
            label={this.getHeaderLabel(index)}
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
        />*/}
        <div className={clsx('ap-timelist-header', this.props.classes.apTimeListHeader)}>
          <span
            // id={labelId}
            // onClick={onViewChange}
            className={clsx('ap-calendar-btn-view', this.props.classes.apCalendarBtnView)}
            // disabled={upDisabled}
            aria-live='polite'
            aria-atomic='true'
          >
            <Typography variant="button">{this.getHeaderLabel()}</Typography>
          </span>
          <Button color="primary" variant="contained" size="small" className={clsx('ap-calendar-header-text', this.props.classes.apCalendarHeaderText, this.props.classes.greyMainColor)}>
            {/*<Typography variant="subtitle1" className={clsx(this.props.classes.greyColor)} >{'0 DAYS / 0 HOURS'}</Typography>*/}
            Set Every Friday
          </Button>
        </div>

        <table style={{ marginBottom: '80px' }} className={this.props.classes.apTimeSlotsTable}>
          <tbody>
            {this.props.selectedDay && rows.map(row => (
              <tr className={clsx(this.props.classes.apTimesRow, this.props.classes.gutterBottom)}>
                {row.map(v => (
                  <AvailabilityView.TimeSlot
                    date={v.date}
                    slotType={v.slotType}
                    onClick={this.handleTimeSlotSelected}
                  >
                    {v.label}
                  </AvailabilityView.TimeSlot>
                ))}
              </tr>
            ))}
          </tbody>
        </table>


        <Box
          display="flex"
          justifyContent="space-evenly"
          mb={3}
        >
          <Box
            display="inline-flex"
            alignItems="center"
            // py={1}
            // px={2}
            mr={2}
            flexGrow={1}
            style={{
              // backgroundColor: 'white',
              // padding: '8px 16px',
              // cursor: 'pointer',
              // userSelect: 'none',
              // borderRadius: 8
            }}
            // onClick={handleLocationCopyClick}
          >
            <Button className={this.props.classes.buttonsDuet} onClick={this.selectAllTimeSlots}>
              <Box
                display="flex"
                className={this.props.classes.redColor}
                mr={2}
              >
                <SquaresIcon />
              </Box>
              <Typography variant="caption" color="primary">
                Select all
              </Typography>
            </Button>
          </Box>

          <Box
            display="inline-flex"
            alignItems="center"
            // py={1}
            // px={2}
            flexGrow={1}
            style={{
              // backgroundColor: 'white',
              // padding: '8px 16px',
              // cursor: 'pointer',
              // userSelect: 'none',
              // borderRadius: 8
            }}
            // onClick={handleLocationOpenClick}
          >
            <Button className={this.props.classes.buttonsDuet} onClick={this.clearAllTimeSlots}>
              <Box
                display="flex"
                className={this.props.classes.redColor}
                mr={2}
              >
                <SquaresOIcon />
              </Box>
              <Typography variant="caption" color="primary">
                Clear all
              </Typography>
            </Button>
          </Box>
        </Box>

        <Box
          display="flex"
          justifyContent="space-evenly"
          mb={3}
        >
          <Box
            display="inline-flex"
            alignItems="center"
            // py={1}
            // px={2}
            mr={2}
            flexGrow={1}
            style={{
              // backgroundColor: 'white',
              // padding: '8px 16px',
              // cursor: 'pointer',
              // userSelect: 'none',
              // borderRadius: 8
            }}
            // onClick={handleLocationCopyClick}
          >
            <Button
              variant="contained"
              /*className={this.props.classes.buttonsDuet}*/
              color="primary"
              size="medium"
              style={{ flexGrow: 1 }}
              onClick={this.handleConfirm}
            >
              <Box
                display="flex"
                className={this.props.classes.redColor}
                mr={2}
              >
                <CheckBoxIcon />
              </Box>
              <Typography variant="button">
                Apply
              </Typography>
            </Button>
          </Box>

          <Box
            display="inline-flex"
            alignItems="center"
            // py={1}
            // px={2}
            flexGrow={1}
            style={{
              // backgroundColor: 'white',
              // padding: '8px 16px',
              // cursor: 'pointer',
              // userSelect: 'none',
              // borderRadius: 8
            }}
            // onClick={handleLocationOpenClick}
          >
            <Button
              variant="contained"
              /*className={this.props.classes.buttonsDuet}*/
              size="medium"
              style={{ flexGrow: 1 }}
              onClick={this.props.onClose}
            >
              <Box
                display="flex"
                className={this.props.classes.redColor}
                mr={2}
              >
                <CloseIcon />
              </Box>
              <Typography variant="button">
                Close
              </Typography>
            </Button>
          </Box>
        </Box>
      </div>
    );
  }

  handleChange (date: Date) {
    return null;
  }

  handleConfirm() {
    const { onConfirm } = this.props;

    onConfirm(this.state.timeSlots, this.state.isAllDay, this.props.selectedDay);
  }

  handleTimeSlotSelected(/*HashMap<String, String> */timeSlot) {
    const timeSlotsCopy = this.state.timeSlots.slice();
    const found = timeSlotsCopy.find(ts => ts.start.getTime() === timeSlot.getTime());
    let isAllDay = false;

    if (!found) {
      return;
    }

    if (found.slotType === 'UNAVAILABLE') {
      found.slotType = 'AVAILABLE';
      isAllDay = this.allDaySelected();
    } else {
      found.slotType = 'UNAVAILABLE';
    }

    this.setState({ timeSlots: timeSlotsCopy, isAllDay });


    // if (ts.get("startTime").equals(timeSlot.get("startTime")) && ts.get("endTime").equals(timeSlot.get("endTime"))) {

    //     if (timeSlot.get("slotType").equals("")) {
    //         timeSlot.put("slotType", "AVAILABLE");
    //     } else {
    //         timeSlot.put("slotType", "UNAVAILABLE");
    //     }
    // }

    // if (timeSlot.get("slotType").equals("IS_NOT_AVAILABLE_FOR_BOOKING") ||
    //   timeSlot.get("slotType").equals("IN_SESSION")) {
    //   return;
    // }

    // Drawable background = view.getBackground();

    // // Toggle background and text color
    // if (timeSlot.get("slotType").equals("AVAILABLE")) {
    //     LayerDrawable layerDrawable = (LayerDrawable) background;
    //     GradientDrawable outer = (GradientDrawable) layerDrawable.findDrawableByLayerId(R.id.outer);
    //     GradientDrawable inner = (GradientDrawable) layerDrawable.findDrawableByLayerId(R.id.inner);
    //     outer.setColor(ContextCompat.getColor(mContext, R.color.com_trubeapp_grey));
    //     outer.setStroke(1, ContextCompat.getColor(mContext, R.color.com_trubeapp_grey));
    //     inner.setColor(Color.TRANSPARENT);
    //     ((TextView)view).setTextColor(Color.BLACK);
    // } else if (timeSlot.get("slotType").equals("UNAVAILABLE")) {
    //      LayerDrawable layerDrawable = (LayerDrawable) background;
    //      GradientDrawable outer = (GradientDrawable) layerDrawable.findDrawableByLayerId(R.id.outer);
    //      GradientDrawable inner = (GradientDrawable) layerDrawable.findDrawableByLayerId(R.id.inner);
    //      outer.setColor(ContextCompat.getColor(mContext, R.color.com_trubeapp_red));
    //      outer.setStroke(1, ContextCompat.getColor(mContext, R.color.com_trubeapp_red));
    //      inner.setColor(Color.TRANSPARENT);
    //      ((TextView)view).setTextColor(Color.WHITE);
    //  }

    //             // Toggle slot type
    //             for (HashMap<String, String> ts : mTimeSlots) {
    //                 if (ts.get("startTime").equals(timeSlot.get("startTime")) && ts.get("endTime").equals(timeSlot.get("endTime"))) {

    //                     if (timeSlot.get("slotType").equals("UNAVAILABLE")) {
    //                         timeSlot.put("slotType", "AVAILABLE");
    //                     } else {
    //                         timeSlot.put("slotType", "UNAVAILABLE");
    //                     }
    //                 }
    //             }

    //             refreshTimeSlotsList();

    //             if (mTimeSlotSelectionEventListener != null) {
    //                 mTimeSlotSelectionEventListener.onTimeSlotClick(TimeSlotPickerView.this, timeSlot);
    //             }
    //         }
    //     });
  }

  selectAllTimeSlots() {
    const timeSlotsCopy = this.state.timeSlots.slice();
    let bookingHours = 0;
    let index = 0;

    timeSlotsCopy.map(ts => {
      const slotType = ts.slotType;

      if (slotType === 'UNAVAILABLE') {
        ts.slotType = 'AVAILABLE';

        bookingHours++;
      } else {
          if (ts.slotType === 'AVAILABLE') {
              bookingHours++;
          }
      }
    });

    this.setState({ isAllDay: true, bookingHours });

    // mBookingHours = bookingHours;

        // mTimeSlots.clear();

        // mTimeSlots = timeSlots;

        // mAdapter.setTimeSlots(timeSlots);
//        mAdapter.notifyDataSetChanged();
//        mGridView.setAdapter(mAdapter);
        // mGridView.invalidateViews();
  }

  clearAllTimeSlots() {
    const timeSlotsCopy = this.state.timeSlots.slice();
    let index = 0;

    timeSlotsCopy.map(ts => {
      const slotType = ts.slotType;

      if (slotType === 'AVAILABLE') {
          ts.slotType = 'UNAVAILABLE';
      }
    });

    // TODO: potential bug in counting, when there're slots with IN_SESSION status
    this.setState({ isAllDay: false, bookingHours: 0 });

    // mBookingHours = bookingHours;

        // mTimeSlots.clear();

        // mTimeSlots = timeSlots;

        // mAdapter.setTimeSlots(timeSlots);
//        mAdapter.notifyDataSetChanged();
//        mGridView.setAdapter(mAdapter);
        // mGridView.invalidateViews();
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

export default withStyles(styles)(AvailabilityTimePickerView); //CalendarView;
