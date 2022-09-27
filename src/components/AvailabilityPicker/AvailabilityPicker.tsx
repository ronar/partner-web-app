/**
 *
 *  With Availability
 *  HOC Component
 *
 *  Handles all of the logic with availability


  time, provide with min/max times and time slots
 *  Initialises booking time from start_time query string.
 *  startTimes should be in mapStateToProps param to calculate timeSlots and availableDays
 *
 *  Created by Vladimir Shislyannikov on 14/11/2019.
 *  Copyright (c) 2021 iWoo Ltd. All rights reserved.
 *
 */


import React, { useState, useEffect, useCallback, useRef } from 'react';
// import ReactDOM from 'react-dom';
// import createReactClass from 'create-react-class';
import PropTypes from 'prop-types'; // use directly
// import hoistNonReactStatic from 'hoist-non-react-statics';
// import { withRouter } from 'react-router';
// import { connect } from 'react-redux';
// import compose from 'recompose/compose';
// import { updateBookingDateTime } from 'mainApp/actions/ui';
// import _ from 'mainApp/utils/_';
// import { getMoment, extractTimeSlotsForDate, inRangeTime, } from 'mainApp/utils/date';
// import { LOCATION_TYPES } from 'mainApp/constants';

// import BookingTime from 'mainApp/BookingTime';

import clsx from 'clsx';
// const Calendar = require('./Calendar');
// const TimeList = require('./TimeList');
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';

import CloseIcon from '../../icons/Close2Icon';

import { makeStyles, Theme } from '@material-ui/core/styles';

import SlidingUpPanel from 'rn-sliding-up-panel';

import Header from './Header/Header';
import Month from './Month/Month';
import AvailabilityDatePickerView from './AvailabilityDatePicker/AvailabilityDatePicker';
import AvailabilityTimePickerView from './AvailabilityTimePicker/AvailabilityTimePicker';


import { DayAvailability, TimeSlot } from '../../types';
import { dates } from '../../utils/dates';
import { getViewportHeight } from '../../utils';
import { date as dateLocalizer } from '../../utils/localizers';

import { useAppState } from '../../state';

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: '100%',
  },
  closeAvailabilityTimePickerPanel: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },
};

const panelStyles = {
  backdrop: {
      position: 'fixed',
      zIndex: 1000,
  },
  container: {
    position: 'fixed',
    // flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    zIndex: 1000,
  },
};

const height = getViewportHeight();

// ignoreStartTimeQueryParam - controls whether the WrappedComponent depends on
// start_time query param or it should not rely on it
// Potential bug: when one component depends setting date on this param,
// while the others don't
// export default function AvailabilityPicker(mapStateToProps: object, ignoreStartTimeQueryParam: boolean) {
export default function AvailabilityPicker(props: {
  disabled?: boolean;
  className?: string;
  readOnly?: boolean;
  focused?: boolean;
  culture?: string;
  activeId?: string;
  tabIndex?: number;
  currentDate?: Date;
  value?: Date;
  // views?: any;
  min?: Date;
  max?: Date;
  dayComponent?: any;
  dayFormat?: string;
  dateFormat?: string;
  /**
   * A formatter for the header button of the month view.
   *
   * @example ['dateFormat', ['headerFormat', "{ date: 'medium' }"]]
   */
  headerFormat?: string; //PropTypes.string,

  onCurrentDateChange?: (date: Date) => void;
  onChange?: (date: Date) => void;
}) {
  const {
    // currentDate,
    className,
    value,
    disabled,
    readOnly,
    // views,
    min,
    max,
    culture,
    tabIndex,
  } = props;

  // const classes = useStyles();

  const { user, dayAvailability, setDayAvailability, getAvailability, updateAvailability } = useAppState();

  const [ focused, setFocused ] = useState(false);
  const [ _currentDate, _setCurrentDate ] = useState(false);
  const [ selectedDay, setSelectedDay ] = useState<Date | null>(null);
  const [ _highlightedDays, _setHighlightedDays ] = useState<number[]>([]);
  const [ _hasBookingsDays, _setHasBookingsDays ] = useState<number[]>([]);

  // const [ dayAvailability, setDayAvailability ] = useState<DayAvailability[]>([]);

  const panelRef = useRef<SlidingUpPanel>(null);

  useEffect(() => {
    getAvailability(user?.id!);
  }, []);

  // console.log('dayAvailability', dayAvailability);

  const getCurrentDate = (): Date => props.currentDate || value || new Date();

  const getHeaderLabel = (): string => {
    let { culture, headerFormat } = props,
      currentDate = getCurrentDate();

    headerFormat = dateLocalizer.getFormat('header', 'MMMM'/*headerFormat*/);
        // headerFormat = headerFormat || 'MMMM YYYY';

        // if (['LEFT', 'RIGHT'].indexOf(direction) !== -1) {
        //     let method = direction === 'LEFT' ? 'subtract' : 'add';

        //     return dateLocalizer.format(dates[method](this.getCurrentDate(), 1, this.state.view), headerFormat, culture);
        // }

    return dateLocalizer.format(currentDate, headerFormat, culture);
  };

  const inRangeValue = (_value: any) => {
    let value = dateOrNull(_value);

    if (value === null) {
        return value;
    }

    return dates.max(
        dates.min(value, max),
        min
    );
  };

  const setCurrentDate = useCallback((date: Date, currentDate: Date = getCurrentDate()) => {
    const inRangeDate = inRangeValue(date ? new Date(date) : currentDate);

    if (dates.eq(inRangeDate, dateOrNull(currentDate), 'month')) {
        return;
    }

    _setCurrentDate(inRangeDate);

    setSelectedDay(date);

    // notify(this.props.onCurrentDateChange, inRangeDate);
    props.onCurrentDateChange && props.onCurrentDateChange(inRangeDate);
  }, [props.onCurrentDateChange, setSelectedDay]);

  // @widgetEditable
  const handleChange = useCallback((date) => {
    var { /*views, */onChange } = props;
    // var { view } = this.state;

    // if (views[0] === view || views[1] === view) {
        setCurrentDate(date);

        // notify(onChange, date);

        onChange && onChange(date);

        focus();

        panelRef?.current?.show();

        // return;
    // }

    // this.navigate('DOWN', date);

    // this.navigate(DOWN, date)

    // this.setCurrentDate(date);

    // notify(onChange, date);

    // this.focus();


  }, []);

  const handleConfirm = useCallback((timeSlots: TimeSlot[], isAllDay: boolean, day: Date) => {
    const dayStr = dateLocalizer.format(day, 'YYYY-MM-DD'/*format(props)*/, culture);
    let dayAvailabilityCopy = dayAvailability?.slice();

    // To preset state
    dayAvailabilityCopy?.map(v => {
      if (v.day === dayStr) {
        return {
          ...v,
          allDay: isAllDay,
          timeSlots,
        }
      }

      return v;
    });

    if (dayAvailabilityCopy) {
      setDayAvailability(dayAvailabilityCopy);
    }

    // Prepare data to send to the BE
    let newDayAvailability = dayAvailability?.reduce((dayAvailabilityAcc: DayAvailability[], v) => {
      let newValue = {
        day: v.day,
        allDay: v.allDay,
        timeSlots: v.timeSlots.slice(),
      };

      if (newValue.day === dayStr) {
        newValue.allDay = isAllDay;

        if (timeSlots && !isAllDay) {

          // for(TimeSlot ets : elemTimeSlots) {
          //                           if (ets.getStartTime().equals(ts.get("startTime"))) {
          //                               ets.setSlotType(ts.get("slotType"));
          //                           }
          //                       }

          //                       if (ts.get("slotType").equals("AVAILABLE")) {
          //                           TimeSlot newTimeSlot = new TimeSlot();

          //                           newTimeSlot.setStartTime(ts.get("startTime"));
          //                           newTimeSlotList.add(newTimeSlot);
          //                       }

          // newValue.timeSlots.map(ets => {
          //   const foundTimeSlot = timeSlots.find(slot => slot.startTime === ets.startTime);

          //   if (foundTimeSlot) {
          //     ets.slotType = foundTimeSlot.slotType;
          //   }
          // });

          newValue.timeSlots = timeSlots.reduce((acc: TimeSlot[], ts: TimeSlot) => {
            if (ts.slotType === 'AVAILABLE') {
              acc.push({ 'startTime': ts.startTime });
            }

            return acc;
          }, []);
        } else {
          newValue.timeSlots.map(ts => {
            if (isAllDay) {
              if (ts.slotType === 'UNAVAILABLE') {
                ts.slotType = 'AVAILABLE';
              }
            } else {
              if (ts.slotType === 'AVAILABLE') {
                ts.slotType = 'UNAVAILABLE';
              }
            }

            return ts;
          });


          //  for(TimeSlot ets : elemTimeSlots) {
          //     if (isAllDay) {
          //         if (ets.getSlotType().equals("UNAVAILABLE")) {
          //             ets.setSlotType("AVAILABLE");
          //         }
          //     } else {
          //         if (ets.getSlotType().equals("AVAILABLE")) {
          //             ets.setSlotType("UNAVAILABLE");
          //         }
          //     }
          // }
        }

          // if (ts.get("slotType").equals("AVAILABLE")) {
          //   TimeSlot newTimeSlot = new TimeSlot();

          //   newTimeSlot.setStartTime(ts.get("startTime"));
          //   newTimeSlotList.add(newTimeSlot);
          // }



      //      {
      //           for(TimeSlot ets : elemTimeSlots) {
      //               if (ets.getStartTime().equals(ts.get("startTime"))) {
      //                   ets.setSlotType(ts.get("slotType"));
      //               }
      //           }


      //       }
      //   } else {
      // }
        dayAvailabilityAcc.push(newValue);
      }

      return dayAvailabilityAcc;
    }, []);

    updateAvailability(user?.id!, newDayAvailability || []);
  }, [user, dayAvailability]);

    // Partner partner = Storage.instance().getPartner();

    // List<DayAvailability> newDayAvailabilityList = new ArrayList<>();

    // Iterator<DayAvailability> iter = dayAvailabilityList.listIterator();

    // SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);

    // String date = sdf.format(day.getTime());

                // while (iter.hasNext()) {

                //     DayAvailability elem = iter.next();

                //     if (date.equals((elem.getDay()))) {
                //         List<TimeSlot> newTimeSlotList = new ArrayList<>();
                //         DayAvailability newDayAvailability = new DayAvailability();
                //         List<TimeSlot> elemTimeSlots = elem.getTimeSlots();

                //         newDayAvailability.setDay(date);
                //         newDayAvailability.setAllDay(String.valueOf(isAllDay));

                //         if (timeSlots != null && !isAllDay) {

                //             for(HashMap<String, String> ts : timeSlots) {
                //                 for(TimeSlot ets : elemTimeSlots) {
                //                     if (ets.getStartTime().equals(ts.get("startTime"))) {
                //                         ets.setSlotType(ts.get("slotType"));
                //                     }
                //                 }

                //                 if (ts.get("slotType").equals("AVAILABLE")) {
                //                     TimeSlot newTimeSlot = new TimeSlot();

                //                     newTimeSlot.setStartTime(ts.get("startTime"));
                //                     newTimeSlotList.add(newTimeSlot);
                //                 }
                //             }
                //         } else {
                //             for(TimeSlot ets : elemTimeSlots) {
                //                 if (isAllDay) {
                //                     if (ets.getSlotType().equals("UNAVAILABLE")) {
                //                         ets.setSlotType("AVAILABLE");
                //                     }
                //                 } else {
                //                     if (ets.getSlotType().equals("AVAILABLE")) {
                //                         ets.setSlotType("UNAVAILABLE");
                //                     }
                //                 }
                //             }
                //         }

                //         elem.setAllDay(String.valueOf(isAllDay));

                //         newDayAvailability.setTimeSlots(newTimeSlotList);

                //         newDayAvailabilityList.add(newDayAvailability);
                //     }
                // }

                // partner.setAvailability(newDayAvailabilityList);

    // final SetPartnerAvailability command = new SetPartnerAvailability(this, getProgressBarHandler(), timeSlots, avd.getAvailability().getDayAvailability(), isAllDay, day, callback);
        // command.execute();
  // }

  const focus = () => {

  };

  const setHighlightedDays = (days: any[]) => {
    _setHighlightedDays(days);

  };

  const setHasBookingsDays = (days: any[]) => {
    _setHasBookingsDays(days);
  };

  var currentDate = getCurrentDate();
  var todaysDate = new Date();
        // todayNotInRange = !dates.inRange(todaysDate, min, max, view);

  const key = 'view_month' + dates['month'](currentDate);

  const isRtl = false;

  return (
    <div
            // {...elementProps}
            role='group'
            // focused={focused}
            // disabled={disabled}
            // readOnly={readOnly}
            tabIndex={tabIndex || 0}
            // onBlur={this.focusManager.handleBlur}
            // onFocus={this.focusManager.handleFocus}
            className={clsx(className, 'ap-widget', 'ap-calendar', 'ap-widget-container', { 'ap-rtl': isRtl, 'ap-state-disabled': disabled, 'ap-state-readonly': readOnly, 'ap-state-focus': focused })}
            // aria-activedescendant={this.activeId}
        >
            {/*<Header
                // // isRtl={this.isRtl()}
                label={getHeaderLabel()}
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
            {/*<SlideTransitionGroup direction={slideDirection}>*/}
                {/*<Month
                    // {...viewProps}
                    key={key}
                    // id={this.viewId}
                    // activeId={this.activeId}
                    value={value}
                    today={todaysDate}
                    disabled={disabled}
                    // prevDisabled={isDisabled || !dates.inRange(this.nextDate('LEFT'), min, max, 'week')}
                    // nextDisabled={isDisabled || !dates.inRange(this.nextDate('RIGHT'), min, max, 'week')}
                    focused={currentDate}
                    dayFormat={'dd'}
                    onChange={handleChange}
                    // aria-labelledby={this.labelId}
                    // onMoveLeft ={this.handleMoveBack}
                    // onMoveRight={this.handleMoveForward}
                />*/}
                <AvailabilityDatePickerView
                  onDaySelected={handleChange}
                  dayAvailability={dayAvailability}
                />

            {/*</SlideTransitionGroup>*/}
            <div className='ap-calendar-footer'>
                <button
                    type='button'
                    className='ap-btn ap-calendar-btn ap-calendar-btn-left'
                    // onClick={this.handleMoveBack}
                    // disabled={isDisabled || !dates.inRange(this.nextDate('LEFT'), min, max, view)}
                >
                    <svg width='8' height='13' viewBox='0 0 8 13' xmlns='http://www.w3.org/2000/svg' className='tb-icon'>
                        <path fillRule='evenodd' d='M8 11.5L6.5 13L5.68248e-07 6.5L6.5 -1.31134e-07L8 1.5L3 6.5L8 11.5Z' />
                    </svg>
                    {/*{this.getHeaderLabel('LEFT')}*/}
                </button>
                <button
                    type='button'
                    className='ap-btn ap-calendar-btn ap-calendar-btn-right'
                    // onClick={this.handleMoveForward}
                    // disabled={isDisabled || !dates.inRange(this.nextDate('RIGHT'), min, max, view)}
                    // label={messages.moveForward()}
                >
                    {/*{this.getHeaderLabel('RIGHT')}*/}
                    <svg width='8' height='13' viewBox='0 0 8 13' xmlns='http://www.w3.org/2000/svg' className='tb-icon'>
                        <path fillRule='evenodd' d='M0 1.5L1.5 0L8 6.5L1.5 13L0 11.5L5 6.5L0 1.5Z' />
                    </svg>
                </button>
            </div>



            <SlidingUpPanel
              ref={panelRef}
              draggableRange={{ top: height - 24/*780*/, bottom: 0 }}
              snappingPoints={[ 118, 500 ]}
              // // onDragStart={ (position) => { this.setState({ isDragged: true }); } }
              // // onDragEnd={ (position) => { this.setState({ isDragged: false }); } }
              // onBottomReached={handleBottomReached}
              // onFullyOpen={ () => setIsFullyOpen(true) }
              // //snappingPoints={[panelExpandedY]}
              backdropStyle={panelStyles.backdrop}
              containerStyle={panelStyles.container}
              height={height - 24 /*807*/}
              friction={0.7}
            >
              {/*<div style={panelStyles.container}>*/}
              <div style={styles.container}>
                <Box
                  display="flex"
                  textAlign="center"
                  py={1}
                  px={2}
                  // justifyContent="space-between"
                >
                  <Box
                    position="absolute"
                  >
                    <button style={styles.closeAvailabilityTimePickerPanel} onClick={() => panelRef.current && panelRef.current.hide()}>
                      <CloseIcon />
                    </button>
                  </Box>
                  <Typography variant="button" color="primary" className={clsx( '' )} style={{ flexGrow: 1 }}>
                      {dateLocalizer.format(selectedDay, 'DD MMMM', culture)}
                  </Typography>
                </Box>
                {selectedDay && (
                <AvailabilityTimePickerView
                  selectedDay={selectedDay}
                  dayAvailability={dayAvailability}
                  onConfirm={handleConfirm}
                  onClose={() => panelRef.current && panelRef.current.hide()}
                />
                )}
              </div>
            </SlidingUpPanel>

        </div>
  );
    // // HOC Factory
    // function wrapComponent(WrappedComponent) {
    //     var displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    //     var minTime = BookingTime.getInitialDate().startOf('day').toDate();
    //     var maxTime = BookingTime.getInitialDate().endOf('month').add(2, 'M').endOf('month').toDate();

    //     const HOCComponent = createReactClass({
    //         displayName: `WithAvailabilityPicker(${displayName})`,
    //         propTypes: {
    //             bookingTime: PropTypes.instanceOf(Date),
    //             startTimes: PropTypes.object, // from passed mapStateToProps
    //         },

    //         // contextTypes: {
    //         //     filtersLocationType: PropTypes.number,
    //         //     filtersDayAndTime: PropTypes.shape({}),
    //         //     filtersBookingDate: PropTypes.string,
    //         //     changeDirectBookingDateFilter: PropTypes.func,
    //         // },

    //         getInitialState () {
    //             const { bookingTime, confirmedBooking } = this.props;
    //             var timeSlots,
    //                 availableDays = [];

    //             var query = new URLSearchParams(this.props.location.search);
    //             var startTime = query.get('start_time');

    //             this.bookingTime = new BookingTime(startTime && !ignoreStartTimeQueryParam ? new Date(Number(startTime)) : new Date(bookingTime));

    //             let startTimes = this.props.startTimes && Object.keys(this.props.startTimes).length
    //                 ? this.props.startTimes
    //                 : confirmedBooking && confirmedBooking.partner && confirmedBooking.partner.startTimes;

    //             if (startTimes) {
    //                 availableDays = Object.keys(startTimes);

    //                 // if (!this.bookingTime.isValid()) {
    //                 if (!startTime || ignoreStartTimeQueryParam) {
    //                     this.nextAvailableDate(startTimes);
    //                 }
    //                 // }

    //                 timeSlots = this.getTimeSlots(startTimes);
    //             }

    //             return {
    //                 availableDays,
    //                 timeSlots,
    //             };
    //         },

    //         UNSAFE_componentWillMount () {
    //         },

    //         UNSAFE_componentWillReceiveProps (nextProps) {
    //             var timeSlots,
    //                 availableDays = [];

    //             if (!_.isShallowEqual(nextProps.startTimes, this.props.startTimes)) {
    //                 availableDays = Object.keys(nextProps.startTimes);

    //                 var query = new URLSearchParams(this.props.location.search);
    //                 var startTime = query.get('start_time');

    //                 // We can't just set next available time, as in Checkout it'll
    //                 // default time to the next available. We check for start_time
    //                 // query string is not present to not reset the time

    //                 // REMOVE THIS COMMENT LATER:
    //                 // BUG!!
    //                 // This check will control setting the date in the Time Slots Pop-up
    //                 // In situations when there's start_time by any reason in the URL
    //                 // it'll skip the date set in the Day & Time Picker on the Partner List page
    //                 // The last check this.bookingTime.isValid() is messing with Checkout page
    //                 if (!startTime || ignoreStartTimeQueryParam/* || !this.bookingTime.isValid()*/) {
    //                     this.nextAvailableDate(nextProps.startTimes);
    //                 }

    //                 // Is it okay to set time slots after we get nextAvailableDate
    //                 timeSlots = this.getTimeSlots(nextProps.startTimes);

    //                 this.setState({
    //                     availableDays,
    //                     timeSlots,
    //                 });
    //             }
    //         },

    //         componentDidUpdate (prevProps) {
    //             // Clearing the booking time
    //             if (prevProps.bookingTime && this.props.bookingTime === null) {
    //                 this.bookingTime.clear();
    //                 this.forceUpdate();
    //             }
    //         },

    //         render() {
    //             return React.createElement(WrappedComponent, {
    //                 ...this.props,
    //                 bookingTime: this.bookingTime.getDate(),
    //                 minTime,
    //                 maxTime,
    //                 availableDays: this.state.availableDays,
    //                 timeSlots: this.state.timeSlots,
    //                 nextAvailableDate: this.nextAvailableDate,
    //                 changeBookingTime: this.bookingTimeChangeHandler,
    //                 // ref: innerRef || this.attachRef,
    //             });
    //         },

    //         // TODO: decide later how to pass culture locale
    //         bookingTimeChangeHandler (value, ...args) {
    //             const { filtersDayAndTime } = this.context;
    //             const { startTimes } = this.props;
    //             const newDate = getMoment(value);

    //             const timesOfDay = filtersDayAndTime.filter(v => v.label);

    //             if (value && newDate.isValid()) {
    //                 let timeSlots;

    //                 timeSlots = this.getTimeSlots(startTimes, value/*this.bookingTime.getDate()*/);

    //                 if (args[0] && args[1]) { // if we went from BookingFlowDateTimeSelector
    //                     this.bookingTime.setDate(value);
    //                     this.props.updateBookingDateTime({ bookingTimeFormatted: this.bookingTime.format('YYYY-MM-DD[T]HH:mm'), bookingTime: this.bookingTime.getTime() });
    //                 } else if (args[1] && !args[0] || /* if we went from NewCalendar in mobiles or from Time Slots when pick date */
    //                     inRangeTime(value, minTime, maxTime, timeSlots) && (!timesOfDay || !timesOfDay.length))
    //                 {
    //                     this.bookingTime.setDate(value);
    //                     // this.context.changeDirectBookingDateFilter({ directBookingDate: newDate.valueOf() });
    //                 } else if (startTimes) {
    //                     this.nextAvailableDate(startTimes, newDate);
    //                 }


    //                 this.setState({ bookingTime: this.bookingTime.getDate(), timeSlots });

    //                 if (args[0]) {
    //                     this.props.updateBookingDateTime({
    //                         bookingTimeFormatted: this.bookingTime.format('YYYY-MM-DD[T]HH:mm'),
    //                         bookingTime: this.bookingTime.getTime(),
    //                         directBookingDate: this.bookingTime.getTime(),
    //                     });
    //                 }


    //             }
    //         },

    //         /*
    //          * @param {Array} dates available days of a partner.
    //          * @param {Object} date Moment|BookingTime object
    //          *
    //          * @example ['2018-11-03', ..]
    //          */
    //         getTimeSlots (dates, date = this.bookingTime) {
    //             var momentDate,
    //                 dateFormatted;

    //             if (!date || !dates) {
    //                 return;
    //             }

    //             momentDate = date instanceof BookingTime
    //                 ? getMoment(date.getDate())
    //                 : getMoment(date);

    //             dateFormatted = momentDate.format('YYYY-MM-DD'); // TODO: make to BookingTime

    //             return dates[dateFormatted] && dates[dateFormatted].startTimes || dates[dateFormatted] || [];
    //         },

    //         /*
    //          * Hashmap with dates
    //          * Sets BookingTime's time
    //          * Expects dates in the following form. Used in UNSAFE_componentWillReceiveProps
    //          * If date is set then we went from onChange handler
    //          * Depends on filters!! from Day & Time Picker
    //          *
    //          * @example { '2020-06-17': { date: new Date(), label: 12 AM }, .. }
    //          * @param Array dates mapped array
    //          */

    //         nextAvailableDate (dates, date) {
    //             const { filtersLocationType, filtersDayAndTime } = this.context;
    //             var availableDates, // list of all available dates
    //                 matchedDaysOfWeek = [], // list of days that met a criteria
    //                 matchedTimesOfDay = []; // list of times that met a criteria
    //             var now = getMoment();
    //             var nextDate;
    //             var afterDate = date;

    //             if (!dates) {
    //                 return;
    //             }

    //             if (!(date && date.isSameOrAfter(now))) {
    //                 afterDate = now;
    //             }

    //             availableDates = Object.keys(dates);

    //             if (!availableDates || !availableDates.length) {
    //                 return;
    //             }

    //             if (BookingTime.alignedToHalfAnHour) {
    //                 BookingTime.roundToHalfAnHour(afterDate);

    //             }

    //             if (afterDate.isBefore(getMoment().add(filtersLocationType === LOCATION_TYPES.LOCATION_TYPE_IN_PERSON ? 3 : 1, 'hours'))) {
    //                 afterDate.add(filtersLocationType === LOCATION_TYPES.LOCATION_TYPE_IN_PERSON ? 3 : 1, 'hours');
    //             }

    //             const daysOfWeek = filtersDayAndTime.filter(v => !v.label);
    //             const timesOfDay = filtersDayAndTime.filter(v => v.label);

    //             if (daysOfWeek.length) {
    //                 matchedDaysOfWeek = availableDates
    //                     .filter(day => {
    //                         let date = getMoment(day, 'YYYY-MM-DD');
    //                         let weekDayName = date.format('ddd'); // Mon, Tue, etc.

    //                         return date.isSameOrAfter(afterDate) && daysOfWeek.some(d => d.name === weekDayName);
    //                     });
    //             }

    //             const filtersBookingDate = date && date.isValid()
    //                 ? date.format('DD MMM YYYY')
    //                 : this.context.filtersBookingDate;

    //             // this.context.filtersBookingDate is not up to date afer selecting in TimeSlotsPopup
    //             // that's why we check bookingTime first if it exists
    //             if (filtersBookingDate) {
    //                 matchedDaysOfWeek = availableDates
    //                     .filter(day => {
    //                         let date = getMoment(day, 'YYYY-MM-DD');
    //                         let bookingDate = getMoment(filtersBookingDate, 'DD MMM YYYY'); //

    //                         return date.isSame(bookingDate, 'day');
    //                     });
    //             }

    //             const pickMatchedTimeSlots = slot => {
    //                 const date = getMoment(slot.date);
    //                 const hour = date.hour();
    //                 const minutes = date.minutes();

    //                 // ???
    //                 const _afterDate = afterDate.isSame(new Date(), 'day') ? afterDate : afterDate.clone().startOf('day');

    //                 return timesOfDay.some((tod) => {
    //                     return date.isSameOrAfter(_afterDate) &&
    //                         ((tod.id === 'morning' && (hour * 60 + minutes) >= 330 && hour <= 12) ||
    //                         (tod.id === 'midday'  && hour >= 12 && hour <= 16) ||
    //                         (tod.id === 'evening' && hour >= 16 && hour <= 23));
    //                 });
    //             };

    //             const pickMatchedTimesOfDay = day => {
    //                 let slots = dates[day];

    //                 return slots.find(pickMatchedTimeSlots);
    //             };

    //             if (timesOfDay.length) {
    //                 matchedTimesOfDay = availableDates
    //                     .filter(pickMatchedTimesOfDay);
    //             }

    //             const intersectedDays = matchedDaysOfWeek.filter(value => matchedTimesOfDay.includes(value));

    //             if (intersectedDays.length) {
    //                 intersectedDays
    //                     .some(day => {
    //                         const slots = dates[day];

    //                         nextDate = slots.find(pickMatchedTimeSlots);

    //                         return nextDate;
    //                     });
    //             } else if (matchedDaysOfWeek.length) {
    //                 matchedDaysOfWeek
    //                     .some(day => {
    //                         const slots = dates[day];

    //                         nextDate = slots.find(slot => {
    //                             return getMoment(slot.date).isSameOrAfter(afterDate) && slot.date;
    //                         });

    //                         return nextDate;
    //                     });
    //             } else if (matchedTimesOfDay.length) {
    //                 matchedTimesOfDay
    //                     .some(day => {
    //                         const slots = dates[day];

    //                         nextDate = slots.find(pickMatchedTimeSlots);

    //                         return nextDate;
    //                     });
    //             }

    //             // Fallback
    //             if (!nextDate || (date && !date.isSame(nextDate.date, 'day'))) {
    //                 afterDate.startOf('day');

    //                 availableDates.some(day => {
    //                     const date = dates[day];

    //                     nextDate = date.find(v => {
    //                         const dateMoment = getMoment(v.date);
    //                         const nowMoment = getMoment();
    //                         return dateMoment.isSameOrAfter(afterDate) && (!dateMoment.isSame(nowMoment, 'day') || dateMoment.isSameOrAfter(nowMoment)) && v.date;
    //                     });

    //                     return nextDate;
    //                 });
    //             }

    //             if (nextDate) {
    //                 this.bookingTime.setDate(nextDate.date);
    //                 this.setState({ bookingTime: nextDate.date });
    //                 this.context.changeDirectBookingDateFilter({ directBookingDate: nextDate.date.getTime() });
    //             }
    //         },
    //     });

    //     // const finalMapStateToProps = (state, ownProps) => {
    //     //     if (typeof mapStateToProps !== 'function') {
    //     //         return { bookingDateTime: state.ui.filters.bookingDateTime };
    //     //     }

    //     //     return Object.assign({}, mapStateToProps(state, ownProps), { bookingDateTime: state.ui.filters.bookingDateTime });
    //     // }

    //     return hoistNonReactStatic(withRouter(connect(mapStateToProps, { updateBookingDateTime })(HOCComponent)), WrappedComponent);
    //     // return hoistNonReactStatic(HOCComponent, WrappedComponent);
    // }

    // return wrapComponent;
}

function dateOrNull(dt: any) {
  if (dt && !isNaN(dt.getTime())) {
    return dt;
  }

  return null;
}

// Borrowed from MathUtils
//
function constrain(amount: number, low: number, high: number) {
  return amount < low ? low : (amount > high ? high : amount);
}

  // // Date picker
 //    private AvailabilityDatePicker mDatePicker;

 //    // Time picker
 //    private AvailabilityTimePicker mTimePicker;



 //      setOnClickListener(new View.OnClickListener() {
 //            @Override
 //            public void onClick(View v) {
 //                mTimePickerGridView.setVisibility(View.INVISIBLE);
 //                mSlidingUpPanelLayout.setPanelState(TBSlidingUpPanelLayout.PanelState.HIDDEN);
 //            }
 //        });

 //        mAddAvailableTimeButton.setOnClickListener(new View.OnClickListener() {
 //            @Override
 //            public void onClick(View v) {
 //                mSlidingUpPanelLayout.setPanelState(TBSlidingUpPanelLayout.PanelState.EXPANDED);
 //            }
 //        });

 //        final ToggleButton allDayButton = findViewById(R.id.toggleButton);
 //        final View timePickerExpandMoreImage = findViewById(R.id.timePickerExpandMoreImage);

 //        timePickerExpandMoreImage.setOnClickListener(new View.OnClickListener() {
 //            @Override
 //            public void onClick(View v) {
 //                mSlidingUpPanelLayout.setPanelState(TBSlidingUpPanelLayout.PanelState.HIDDEN);
 //            }
 //        });


  // //
  // export default function AvailabilityPicker() {

  // }


