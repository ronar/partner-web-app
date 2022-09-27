/*
 * Created by Vladimir Shishlyannikov on 22/09/2022.
 * Copyright (c) 2022 iWoo Ltd. All rights reserved.
 */
// package com.trubeapp.application.partner.availabilityview;

// import android.annotation.TargetApi;
// import android.content.Context;
// import android.content.res.ColorStateList;
// import android.content.res.Resources;
// import android.graphics.Canvas;
// import android.graphics.Paint;
// import android.graphics.Typeface;
// import android.os.Build;
// import android.support.annotation.Nullable;
// import android.text.TextPaint;
// import android.view.MotionEvent;
// import android.view.View;
// import android.view.ViewConfiguration;
// import android.util.AttributeSet;
// import android.widget.TextView;

// import com.trubeapp.android.client.resource.DayAvailability;
// import com.trubeapp.application.partner.R;

// import java.text.NumberFormat;
// import java.text.SimpleDateFormat;
// import java.util.Calendar;
// import java.util.List;
// import java.util.Locale;


import React, { PropsWithChildren, useCallback } from 'react';
import PropTypes from 'prop-types'; // use directly
import clsx from 'clsx';
// import BackgroundSelectionHeader from './BackgroundSelectionHeader/BackgroundSelectionHeader';
// import BackgroundThumbnail from './BackgroundThumbnail/BackgroundThumbnail';
import Drawer from '@material-ui/core/Drawer';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import { backgroundConfig } from '../VideoProvider/useBackgroundSettings/useBackgroundSettings';

// const createReactClass = require('create-react-class');
// const PropTypes = require('prop-types');
// const cn = require('classnames');

import AvailabilityView from '../AvailabilityView/AvailabilityView'; // './CalendarCell';
// import CalendarCellView from '../CalendarCellView/CalendarCellView'; // './CalendarCell';
import { dates } from '../../../utils/dates';
import { date as dateLocalizer } from '../../../utils/localizers';

import { _ } from '../../../utils/_';
// import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

/**
 * The number of days (ex. 28) in the current month.
 */
// const daysInMonth = 30;

const useStyles = makeStyles((theme: Theme) => ({
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
    color: '#CBCFD5', // '#6b7178',
    // .rw-cell, .rw-head-cell {
    // text-align: center;
    padding: 0,
    border: 0,
    paddingBottom: '10px',
    // }
  },
}));

let dayFormat = (props: any) => dateLocalizer.getFormat('weekday', props.dayFormat);
  // , dateFormat = (dateFormat: any) => dateLocalizer.getFormat('dayOfMonth', dateFormat)

let optionId = (id: string, date: Date) => `${id}__month_${dates.month(date)}-${dates.date(date)}`;

interface MonthProps {
  disabled?: boolean;
  className?: string;
  today?: Date;
  value?: Date;
  focused?: Date;
  culture?: string;
  activeId?: string;
  availableDays?: object[];
  minDate?: Date;
  maxDate?: Date;
  dayComponent?: any;
  dayFormat?: string;
  dateFormat?: string;
  // sessionType: string;
  // onClick(): void;
  // onClose(): void;
  highlightedDays: number[],
  hasBookingsDays: number[],
  onChange(date: Date): void;
}

/**
 * Displays a list of months in a calendar format with selectable days.
 */


export default function Month({
  disabled,
  className,
  culture,
  today,
  value,
  focused,
  activeId,
  availableDays,
  minDate,
  maxDate,
  dayComponent,
  dayFormat,
  dateFormat,
  highlightedDays,
  hasBookingsDays,
  onChange,
}: PropsWithChildren<MonthProps>) {
// export default function Month(props: { disabled?: boolean; className?: string; focused?: boolean; culture?: string; activeId?: string; dayComponent: any; dayFormat?: string; dateFormat?: string; }) {

  const classes = useStyles();

  // const [ enabledDayStart, setEnabledDayStart ] = useState(1);
  // const [ enabledDayEnd, setEnabledDayEnd ] = useState(31);
  // const { isBackgroundSelectionOpen, setIsBackgroundSelectionOpen } = useVideoContext();

  // const imageNames = backgroundConfig.imageNames;
  // const images = backgroundConfig.images;

  // var { className, focused, culture, activeId, dayFormat } = props;
  focused = minDate; // new Date();
  var month = dates.visibleDays(focused, culture);
  var rows: any = _.chunk(month, 7);

  dayFormat = dateLocalizer.getFormat('weekday', dayFormat);


  // useEffect(() => {
  //   setEnabledDayStart(constrain(enabledDayStart, 1, DAYS_IN_MONTH));
  //   mEnabledDayEnd = constrain(enabledDayEnd, mEnabledDayStart, DAYS_IN_MONTH);
  // });
  // constrain

  const renderRow = useCallback((row, rowIndex) => {
    // let {
    //   focused,
    //   today,
    //   disabled,
    //   onChange,
    //   value,
    //   culture,
    //   minDate,
    //   maxDate,
    //   // dayComponent: Day
    //   dayComponent
    // } = props,
    const id = 'month_row', //instanceId(this),
    labelFormat = dateLocalizer.getFormat('footer');

    return (
      <AvailabilityView.Row key={rowIndex}>
        {row.map((date: Date, colIndex: number) => {
          let formattedDate = dateLocalizer.format(date, dateLocalizer.getFormat('dayOfMonth', dateFormat), culture),
          label = dateLocalizer.format(date, labelFormat, culture);

          const hasBooking = !!hasBookingsDays[dates.date(date)];
          const isHighlighted = !!highlightedDays[dates.date(date)];

          return (
            <AvailabilityView.Cell
              style={rowIndex === 0 ? { paddingTop: '24px' } : null}
              key={colIndex}
              id={optionId(id, date)}
              label={label}
              date={date}
              now={today}
              min={minDate}
              max={maxDate}
              enabledDayStart={1}
              enabledDayEnd={31}
              unit="day"
              viewUnit="month"
              onChange={onChange}
              focused={focused}
              hasBooking={hasBooking}
              isHighlighted={isHighlighted}
              selected={value}
              // selected={selected}
              disabled={disabled}
            >
              {/*Day ? <Day date={date} label={formattedDate}/> : formattedDate */}
              { formattedDate }
            </AvailabilityView.Cell>
          )
        })}
      </AvailabilityView.Row>
    );
  }, []);

  const renderHeaders = useCallback((week, format, culture) => {
    var firstOfWeek = dateLocalizer.firstOfWeek(culture);

    return week.map((date: Date) => {
        return (
            <th
                className={clsx(classes.apHeadCell, 'ap-head-cell')}
                key={'header_' + dates.weekday(date, undefined, firstOfWeek)}
            >
                <div>{dateLocalizer.format(date, format, culture)}</div>
            </th>
        );
    });
  }, []);

  return (
    <>
    <table
      // {...Props.omitOwn(this)}
      role='grid'
      tabIndex={-1}
      // aria-activedescendant={ activeId || null }
      className={clsx(
        className,
        classes.apNavView,
        classes.apCalendarGrid,
        'ap-nav-view',
        'ap-calendar-grid'
      )}
    >
        <thead className={clsx(classes.apCalendarGrid, 'ap-calendar-head')}>
            <tr className={clsx(classes.apCalendarRow, 'ap-calendar-row')}>
                {renderHeaders(rows[0], dayFormat, culture)}
            </tr>
        </thead>
        <tbody className='ap-calendar-body'>
            {rows.map(renderRow)}
        </tbody>
    </table>
    <Drawer
      variant="persistent"
      anchor="right"
      // open={isBackgroundSelectionOpen}
      transitionDuration={0}
      classes={{
        paper: classes.drawer,
      }}
    >

      {/*<BackgroundSelectionHeader onClose={() => setIsBackgroundSelectionOpen(false)} />
      <div className={classes.thumbnailContainer}>
        <BackgroundThumbnail thumbnail={'none'} name={'None'} />
        <BackgroundThumbnail thumbnail={'blur'} name={'Blur'} />
        {images.map((image, index) => (
          <BackgroundThumbnail
            thumbnail={'image'}
            name={imageNames[index]}
            index={index}
            imagePath={image}
            key={image}
          />
        ))}
      </div>*/}
    </Drawer>
    </>
  );
}

Month.propTypes = {
  activeId: PropTypes.string,
  culture: PropTypes.string,
  today: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  focused: PropTypes.instanceOf(Date),
  /**
   * Available days of the week. If not present then it will be disabled.
   *
   * @example ['prop', ['availableDays', '['2018-11-03', ..]']]
   */
  availableDays: PropTypes.array,
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,

  dayComponent: PropTypes.object, // CustomPropTypes.elementType,
  dayFormat: PropTypes.object,
  dateFormat: PropTypes.string, // CustomPropTypes.dateFormat
  // footerFormat: PropTypes.string,

  disabled: PropTypes.bool,
};

// TODO: move all the logic to AvailabilityPicker
function constrain(amount: number, low: number, high: number) {
  return amount < low ? low : (amount > high ? high : amount);
}



//     private static final String TAG = MonthView.class.getSimpleName();

//     public static final int STATE_ENABLED = 1, STATE_ACTIVATED = 1 << 1, STATE_PRESSED = 1 << 2;

//     private static final int[][] STATE_SETS = new int[8][];

//     static {
//         STATE_SETS[0] = new int[]{0};
//         STATE_SETS[1] = new int[]{android.R.attr.state_enabled};
//         STATE_SETS[2] = new int[]{android.R.attr.state_activated};
//         STATE_SETS[3] = new int[]{android.R.attr.state_enabled, android.R.attr.state_activated};
//         STATE_SETS[4] = new int[]{android.R.attr.state_pressed};
//         STATE_SETS[5] = new int[]{android.R.attr.state_enabled, android.R.attr.state_pressed};
//         STATE_SETS[6] = new int[]{android.R.attr.state_activated, android.R.attr.state_pressed};
//         STATE_SETS[7] = new int[]{android.R.attr.state_enabled, android.R.attr.state_activated, android.R.attr.state_pressed};
//     }

//     private static final int DAYS_IN_WEEK = 7;
//     private static final int MAX_WEEKS_IN_MONTH = 6;

//     private static final int DEFAULT_SELECTED_DAY = -1;
//     private static final int DEFAULT_WEEK_START = Calendar.SUNDAY;

//     private static final String MONTH_YEAR_FORMAT = "MMMM y";

//     private static final String DEFAULT_TITLE_FORMAT = "MMMMy";
//     private static final String DAY_OF_WEEK_FORMAT;

//     static {
//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR2) {
//             DAY_OF_WEEK_FORMAT = "EEEEE";
//         } else {
//             DAY_OF_WEEK_FORMAT = "E";
//         }
//     }

//     @SuppressWarnings("FieldCanBeLocal")
//     private final int DRAW_RECT = 0;


//     private final TextPaint mHeaderPaint = new TextPaint();
//     private final TextPaint mDayOfWeekPaint = new TextPaint();
//     private final TextPaint mDayPaint = new TextPaint();
//     private final Paint mDaySelectorPaint = new Paint();
//     private final Paint mDayHighlightPaint = new Paint();
//     private final Paint mDayRangeSelectorPaint = new Paint();
//     private final Paint mDayHasBookingsMarkerPaint = new Paint();
//     private final Paint mHrPaint = new Paint();

//     private final Calendar mCalendar = Calendar.getInstance();
//     private final Calendar mDayOfWeekLabelCalendar = Calendar.getInstance();

//     // Desired dimensions.
//     private int mDesiredMonthHeaderHeight;
//     private int mDesiredDayOfWeekHeight;
//     private int mDesiredDayHeight;
//     private int mDesiredCellWidth;
//     private int mDesiredDaySelectorRadius;
//     private int mDesiredHasBookingsRadius;

//     /**
//      * The first day of the week (ex. Calendar.SUNDAY).
//      */
//     private int mWeekStart = DEFAULT_WEEK_START;

//     /**
//      * The number of days (ex. 28) in the current month.
//      */
//     private int mDaysInMonth = 30;

//     /**
//      * The day of week (ex. Calendar.SUNDAY) for the first day of the current
//      * month.
//      */
//     private int mDayOfWeekStart;

//     /**
//      * Optional listener for handling day click actions.
//      */
//     private OnDayClickListener mOnDayClickListener;


//     private ColorStateList mHeaderTextColor;
//     private ColorStateList mDayTextColor;

//     private int mTouchedItem = -1;

//     private int mHrDividerColor;

//     private Context mContext;

//     private int mTouchSlopSquared;
//     private float mPaddingRangeIndicator;

//     private SimpleDateFormat mFullMonthWithYearFormatter;
//     private SimpleDateFormat mTodayDateFormatter;
//     private SimpleDateFormat mDayOfWeekFormatter;
//     private NumberFormat mDayFormatter;

//     private int mMonth;
//     private int mYear;

//     // Dimensions as laid out.
//     private int mMonthHeight; // Overall view height
//     private int mMonthHeaderHeight;
//     private int mDayOfWeekHeight;
//     private int mDayHeight;
//     private int mCellWidth;
//     private int mDaySelectorRadius;
//     private int mHasBookingsRadius;

//     private int mPaddedWidth;
//     private int mPaddedHeight;

//     private final AvailabilityUtils mAvailabilityUtils = new AvailabilityUtils();

//     /**
//      * The day of month for today, or -1 if the today is not in the current
//      * month.
//      */
//     private int mToday = DEFAULT_SELECTED_DAY;

//     /**
//      * The day of month for the first (inclusive) enabled day.
//      */
//     private int mEnabledDayStart = 1;

//     /**
//      * The day of month for the last (inclusive) enabled day.
//      */
//     private int mEnabledDayEnd = 31;

//     private List<DayAvailability> mDayAvailability;
//     private int[] mHighlightedDays = new int[31];
//     private int[] mHasBookingsDays = new int[31];

//     public MonthView(Context context) {
//         this(context, null);
//     }

//     public MonthView(Context context, @Nullable AttributeSet attrs) {
//         this(context, attrs, R.attr.apMonthViewStyle);
//     }

//     public MonthView(Context context, AttributeSet attrs, int defStyleAttr) {
//         super(context, attrs, defStyleAttr);

//         init();
//     }

//     @TargetApi(Build.VERSION_CODES.LOLLIPOP)
//     public MonthView(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes) {
//         super(context, attrs, defStyleAttr, defStyleRes);

//         init();
//     }

//     public void init() {
//         mContext = getContext();

//         mTouchSlopSquared = ViewConfiguration.get(mContext).getScaledTouchSlop()
//                 * ViewConfiguration.get(mContext).getScaledTouchSlop();

//         final Resources res = mContext.getResources();

//         mDesiredMonthHeaderHeight = res.getDimensionPixelSize(R.dimen.ap_date_picker_month_header_height);
//         mDesiredDayOfWeekHeight = res.getDimensionPixelSize(R.dimen.ap_date_picker_day_of_week_height);
//         mDesiredDayHeight = res.getDimensionPixelSize(R.dimen.ap_date_picker_day_height);
//         mDesiredCellWidth = res.getDimensionPixelSize(R.dimen.ap_date_picker_day_width);
//         mDesiredDaySelectorRadius = res.getDimensionPixelSize(
//                 R.dimen.ap_date_picker_day_selector_radius);
//         mDesiredHasBookingsRadius = res.getDimensionPixelSize(
//                 R.dimen.ap_date_picker_has_bookings_radius);
//         mPaddingRangeIndicator = res.getDimensionPixelSize(R.dimen.ap_month_view_range_padding);

//         final Locale locale = res.getConfiguration().locale;

//         mFullMonthWithYearFormatter = new SimpleDateFormat("MMMM y", locale);
//         mTodayDateFormatter = new SimpleDateFormat("dd MMM"/*datePattern*/, locale);
//         mDayOfWeekFormatter = new SimpleDateFormat(DAY_OF_WEEK_FORMAT, locale);
//         mDayFormatter = NumberFormat.getIntegerInstance(locale);

//         initPaints(res);

//         setWillNotDraw(false);
//         setLayerType(View.LAYER_TYPE_SOFTWARE, null);
//     }

//     /**
//      * Applies the specified text appearance resource to a paint, returning the
//      * text color if one is set in the text appearance.
//      *
//      * @param p     the paint to modify
//      * @param resId the resource ID of the text appearance
//      * @return the text color, if available
//      */
//     private ColorStateList applyTextAppearance(Paint p, int resId) {
//         TextView tv = new TextView(mContext);

//         // 23 or higher
//         if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//             tv.setTextAppearance(resId);
//         } else {
//             tv.setTextAppearance(mContext, resId);
//         }

//         p.setTypeface(tv.getTypeface());
//         p.setTextSize(tv.getTextSize());

//         final ColorStateList textColor = tv.getTextColors();

//         if (textColor != null) {
//             final int enabledColor = textColor.getColorForState(ENABLED_STATE_SET, 0);
//             p.setColor(enabledColor);
//         }

//         return textColor;
//     }

//     public void setHeaderTextAppearance(int resId) {
//         final ColorStateList textColor = applyTextAppearance(mHeaderPaint, resId);

//         if (textColor != null) {
//             mHeaderTextColor = textColor;
//         }

//         invalidate();
//     }


//     public void setDayOfWeekTextAppearance(int resId) {
//         final ColorStateList textColor = applyTextAppearance(mDayOfWeekPaint, resId);

//         if (textColor != null) {
//             final int disbledColor = textColor.getColorForState(STATE_SETS[0], 0);
//             mDayOfWeekPaint.setColor(disbledColor);
//         }

//         invalidate();
//     }

//     public void setDayTextAppearance(int resId) {
//         final ColorStateList textColor = applyTextAppearance(mDayPaint, resId);
//         if (textColor != null) {
//             mDayTextColor = textColor;
//         }

//         invalidate();
//     }

//     public void setHrDividerColor(int resId) {

//         mHrDividerColor = resId;

//         mHrPaint.setColor(resId);

//         invalidate();
//     }

//     /**
//      * Sets up the text and style properties for painting.
//      */
//     private void initPaints(Resources res) {
//         final Typeface museoTypeface = Typeface.createFromAsset(mContext.getAssets(), "fonts/MuseoSansRounded-500.ttf");
//         final Typeface museoTypefaceBold = Typeface.createFromAsset(mContext.getAssets(), "fonts/MuseoSansRounded-700.ttf");

//         final int monthTextSize = res.getDimensionPixelSize(
//                 R.dimen.ap_date_picker_month_text_size);
//         final int dayOfWeekTextSize = res.getDimensionPixelSize(
//                 R.dimen.ap_date_picker_day_of_week_text_size);
//         final int dayTextSize = res.getDimensionPixelSize(
//                 R.dimen.ap_date_picker_day_text_size);

//         mHeaderPaint.setAntiAlias(true);
//         mHeaderPaint.setTextSize(monthTextSize);
//         mHeaderPaint.setTypeface(museoTypefaceBold);

//         mHeaderPaint.setTextAlign(Paint.Align.LEFT);
//         mHeaderPaint.setStyle(Paint.Style.FILL);


//         mDayOfWeekPaint.setAntiAlias(true);
//         mDayOfWeekPaint.setTextSize(dayOfWeekTextSize);
//         mDayOfWeekPaint.setTypeface(museoTypeface);
//         mDayOfWeekPaint.setTextAlign(Paint.Align.CENTER);
//         mDayOfWeekPaint.setStyle(Paint.Style.FILL);

//         mDaySelectorPaint.setAntiAlias(true);
//         mDaySelectorPaint.setStyle(Paint.Style.FILL);

//         mDayHighlightPaint.setAntiAlias(true);
//         mDayHighlightPaint.setStyle(Paint.Style.FILL);

//         mDayRangeSelectorPaint.setAntiAlias(true);
//         mDayRangeSelectorPaint.setStyle(Paint.Style.FILL);

//         mDayHasBookingsMarkerPaint.setAntiAlias(true);
//         mDayHasBookingsMarkerPaint.setStyle(Paint.Style.FILL);

//         mDayPaint.setAntiAlias(true);
//         mDayPaint.setTextSize(dayTextSize);
//         mDayPaint.setTypeface(museoTypeface);
//         mDayPaint.setTextAlign(Paint.Align.CENTER);
//         mDayPaint.setStyle(Paint.Style.FILL);


//         if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
//             mHrPaint.setColor(getResources().getColor(R.color.com_trubeapp_black, mContext.getTheme()));
//         } else {
//             mHrPaint.setColor(getResources().getColor(R.color.com_trubeapp_black));
//         }
//     }

//     void setMonthTextColor(ColorStateList monthTextColor) {
//         final int enabledColor = monthTextColor.getColorForState(ENABLED_STATE_SET, 0);
//         mHeaderPaint.setColor(enabledColor);
//         invalidate();
//     }

//     void setDayOfWeekTextColor(ColorStateList dayOfWeekTextColor) {
//         final int disbledColor = dayOfWeekTextColor.getColorForState(STATE_SETS[0], 0);
//         mDayOfWeekPaint.setColor(disbledColor);
//         invalidate();
//     }

//     void setDayTextColor(ColorStateList dayTextColor) {
//         mDayTextColor = dayTextColor;
//         invalidate();
//     }

//     void setDaySelectorColor(ColorStateList dayBackgroundColor) {
//         final int activatedColor = dayBackgroundColor.getColorForState(
//                 STATE_SETS[STATE_ENABLED | STATE_ACTIVATED], 0);

//         mDaySelectorPaint.setColor(activatedColor);

//         mDayRangeSelectorPaint.setColor(activatedColor);
//         // TODO: expose as attr?
//         mDayRangeSelectorPaint.setAlpha(150);

//         // TODO: make distinct color
//         mDayHighlightPaint.setColor(activatedColor);

//         invalidate();
//     }

//     void setDayHasBookingsMarkerColor(ColorStateList markerBackgroundColor) {
//         final int activatedColor = markerBackgroundColor.getColorForState(
//                 STATE_SETS[STATE_ENABLED | STATE_ACTIVATED], 0);

//         mDayHasBookingsMarkerPaint.setColor(activatedColor);

//         invalidate();
//     }

//     public void setOnDayClickListener(MonthView.OnDayClickListener listener) {
//         mOnDayClickListener = listener;
//     }

//     private CheckForTap mPendingCheckForTap;
//     private int mInitialTarget = -1;
//     private int mDownX, mDownY;

//     private final class CheckForTap implements Runnable {

//         @Override
//         public void run() {
//             mTouchedItem = getDayAtLocation(mDownX, mDownY);
//             invalidate();
//         }
//     }

//     private boolean isStillAClick(int x, int y) {
//         return (((x - mDownX) * (x - mDownX)) + ((y - mDownY) * (y - mDownY))) <= mTouchSlopSquared;
//     }

//     @Override
//     public boolean onTouchEvent(MotionEvent event) {
//         final int x = (int) (event.getX() + 0.5f);
//         final int y = (int) (event.getY() + 0.5f);

//         final int action = event.getAction();
//         switch (action) {
//             case MotionEvent.ACTION_DOWN:
//                 mDownX = x;
//                 mDownY = y;

//                 mInitialTarget = getDayAtLocation(mDownX, mDownY);

//                 if (mInitialTarget < 0) {
//                     return false;
//                 }

//                 if (mPendingCheckForTap == null) {
//                     mPendingCheckForTap = new CheckForTap();
//                 }
//                 postDelayed(mPendingCheckForTap, ViewConfiguration.getTapTimeout());
//                 break;
//             case MotionEvent.ACTION_MOVE:
//                 if (!isStillAClick(x, y)) {
//                     if (mPendingCheckForTap != null) {
//                         removeCallbacks(mPendingCheckForTap);
//                     }

//                     mInitialTarget = -1;

//                     if (mTouchedItem >= 0) {
//                         mTouchedItem = -1;
//                         invalidate();
//                     }
//                 }
//                 break;
//             case MotionEvent.ACTION_UP:
//                 onDayClicked(mInitialTarget);
//             case MotionEvent.ACTION_CANCEL:
//                 if (mPendingCheckForTap != null) {
//                     removeCallbacks(mPendingCheckForTap);
//                 }

//                 mTouchedItem = -1;
//                 mInitialTarget = -1;
//                 invalidate();
//                 break;
//         }
//         return true;
//     }

//     @Override
//     protected void onDraw(Canvas canvas) {

//         final int paddingLeft = getPaddingLeft();
//         final int paddingTop = getPaddingTop();
//         canvas.translate(paddingLeft, paddingTop);

//         drawHeaderLabels(canvas);
//         drawDaysOfWeek(canvas);
//         drawDays(canvas);

//         canvas.translate(-paddingLeft, -paddingTop);
//     }

//     private void drawHeaderLabels(Canvas canvas) {
//         final int paddingLeft = getPaddingLeft();
//         final int paddingRight = getPaddingLeft();
//         final int paddingTop = getPaddingTop();
//         final float x = 0;

//         // Vertically centered within the month header height.
//         final float lineHeight = mHeaderPaint.ascent() + mHeaderPaint.descent();
//         final float y = (mMonthHeaderHeight - lineHeight) / 2f;

//         mHeaderPaint.setTextAlign(Paint.Align.LEFT);

//         if (isCurrentMonth()) {
//             mHeaderPaint.setColor(mHeaderTextColor.getColorForState(STATE_SETS[STATE_ENABLED | STATE_ACTIVATED], 0));
//         }

//         canvas.drawText(mFullMonthWithYearFormatter.format(mCalendar.getTime()).toUpperCase(), x, y - 20, mHeaderPaint);

//         if (isCurrentMonth()) {
//             mHeaderPaint.setTextAlign(Paint.Align.RIGHT);
//             mHeaderPaint.setColor(mHeaderTextColor.getColorForState(STATE_SETS[STATE_ENABLED], 0));
//             canvas.drawText("Today " + mTodayDateFormatter.format(Calendar.getInstance().getTime()), mPaddedWidth, y - 20, mHeaderPaint);
//         }
//     }

//     /**
//      * Draws the month days.
//      */
//     @SuppressWarnings("ConstantConditions")
//     private void drawDays(Canvas canvas) {
//         final TextPaint p = mDayPaint;
//         final int headerHeight = mMonthHeaderHeight + mDayOfWeekHeight;
//         final float rowHeight = mDayHeight;
//         final float colWidth = mCellWidth;

//         // Text is vertically centered within the row height.
//         final float halfLineHeight = (p.ascent() + p.descent()) / 2f;
//         float rowCenter = headerHeight + rowHeight / 2f;
//         float markerPaddingBottom = getResources().getDisplayMetrics().density * 10f;
//         float rowMarkerBottom = headerHeight + rowHeight - markerPaddingBottom;


//         for (int day = 1, col = findDayOffset(); day <= mDaysInMonth; day++) {
//             final float colCenter = colWidth * col + colWidth / 2f;
//             final float colCenterRtl;
//             colCenterRtl = colCenter;

//             int[] stateSet = STATE_SETS[0];

//             final boolean isDayEnabled = isDayEnabled(day);

//             if (isDayEnabled) {
//                 stateSet = STATE_SETS[STATE_ENABLED];
//             }

//             final boolean isSelected = mAvailabilityUtils.isSelected(day) || day == 2;
//             final int isHighlighted = mHighlightedDays[day - 1];
//             final int hasBookings = mHasBookingsDays[day - 1];


//             if (isHighlighted == 1) {
//                 stateSet = STATE_SETS[STATE_ENABLED]; // activated
//                 canvas.drawCircle(colCenterRtl, rowCenter, mDaySelectorRadius, mDayHighlightPaint/*mDaySelectorPaint*/);
//             } else if (isDayEnabled) {

//                 // Use height to constrain the protrusion of the arc
//                 boolean constrainProtrusion = colWidth > (rowHeight - (2 * mPaddingRangeIndicator));
//                 float horDistFromCenter = constrainProtrusion ?
//                         rowHeight / 2f - mPaddingRangeIndicator
//                         : colWidth / 2f;

//             }

//             if (hasBookings == 1) {
//                 canvas.drawCircle(colCenterRtl, rowMarkerBottom, mHasBookingsRadius, mDayHasBookingsMarkerPaint/*mDaySelectorPaint*/);
//             }

//             final boolean isDayToday = mToday == day;
//             final int dayTextColor;

//             if (isDayToday) {
//                 stateSet = STATE_SETS[STATE_ENABLED | STATE_ACTIVATED];
//                 dayTextColor = mDayTextColor.getColorForState(stateSet, 0);
//             } else if (isDayEnabled) {
//                 dayTextColor = mDayTextColor.getColorForState(stateSet, 0);
//             } else {
//                 stateSet = STATE_SETS[0];
//                 dayTextColor = mDayTextColor.getColorForState(stateSet, 0);
//             }

//             p.setColor(dayTextColor);

//             canvas.drawText(mDayFormatter.format(day), colCenterRtl, rowCenter - halfLineHeight, p);

//             col++;

//             if (col == DAYS_IN_WEEK) {
//                 col = 0;
//                 rowCenter += rowHeight;
//                 rowMarkerBottom += rowHeight;
//             }
//         }
//     }

//     private void drawDaysOfWeek(Canvas canvas) {
//         final TextPaint p = mDayOfWeekPaint;
//         final int headerHeight = mMonthHeaderHeight + mDayOfWeekHeight;
//         final int rowHeight = mDayOfWeekHeight;
//         final int colWidth = mCellWidth;

//         final int paddingLeft = getPaddingLeft();
//         final int paddingRight = getPaddingLeft();
//         final int paddingTop = getPaddingTop();
//         final float x = 0; // mPaddedWidth / 2f;

//         // Vertically centered within the month header height.
//         final float lineHeight = mHeaderPaint.ascent() + mHeaderPaint.descent();
//         final float y = (mMonthHeaderHeight - lineHeight) / 2f;// + paddingTop;


//         // Text is vertically centered within the day of week height.
//         final float halfLineHeight = (p.ascent() + p.descent()) / 2f;
//         final int rowCenter = mMonthHeaderHeight + rowHeight / 2 - 20;

//         for (int col = 0; col < DAYS_IN_WEEK; col++) {
//             final int colCenter = colWidth * col + colWidth / 2;
//             final int colCenterRtl = colCenter;

//             final int dayOfWeek = (col + mWeekStart) % DAYS_IN_WEEK;
//             final String label = getDayOfWeekLabel(dayOfWeek);
//             canvas.drawText(label, colCenterRtl, rowCenter - halfLineHeight, p);
//             canvas.drawLine(0, headerHeight - 20, mPaddedWidth, headerHeight - 20, mHrPaint);
//         }
//     }

//     private String getDayOfWeekLabel(int dayOfWeek) {
//         mDayOfWeekLabelCalendar.set(Calendar.DAY_OF_WEEK, dayOfWeek);
//         return mDayOfWeekFormatter.format(mDayOfWeekLabelCalendar.getTime());
//     }

//     private int findDayOffset() {
//         final int offset = mDayOfWeekStart - mWeekStart;
//         if (mDayOfWeekStart < mWeekStart) {
//             return offset + DAYS_IN_WEEK;
//         }
//         return offset;
//     }

//     /**
//      * Calculates the day of the month at the specified touch position. Returns
//      * the day of the month or -1 if the position wasn't in a valid day.
//      *
//      * @param x the x position of the touch event
//      * @param y the y position of the touch event
//      * @return the day of the month at (x, y), or -1 if the position wasn't in
//      * a valid day
//      */
//     public int getDayAtLocation(int x, int y) {
//         final int paddedX = x - getPaddingLeft();
//         if (paddedX < 0 || paddedX >= mPaddedWidth) {
//             return -1;
//         }

//         final int headerHeight = mMonthHeaderHeight + mDayOfWeekHeight; //mMonthHeight + mDayOfWeekHeight;
//         final int paddedY = y - getPaddingTop();
//         if (paddedY < headerHeight || paddedY >= mPaddedHeight) {
//             return -1;
//         }

//         // Adjust for RTL after applying padding.
//         final int paddedXRtl;
//             paddedXRtl = paddedX;

//         final int row = (paddedY - headerHeight) / mDayHeight;
//         final int col = (paddedXRtl * DAYS_IN_WEEK) / mPaddedWidth;
//         final int index = col + row * DAYS_IN_WEEK;
//         final int day = index + 1 - findDayOffset();
//         if (!isValidDayOfMonth(day)) {
//             return -1;
//         }

//         return day;
//     }

//     /**
//      * Called when the user clicks on a day. Handles callbacks to the
//      * {@link OnDayClickListener} if one is set.
//      *
//      * @param day the day that was clicked
//      */
//     private boolean onDayClicked(int day) {
//         if (!isValidDayOfMonth(day) || !isDayEnabled(day)) {
//             return false;
//         }

//         if (mOnDayClickListener != null) {
//             final Calendar date = Calendar.getInstance();
//             date.set(mYear, mMonth, day);

//             mOnDayClickListener.onDayClick(this, date);
//         }
//         return true;
//     }

//     private boolean isDayEnabled(int day) {
//         return day >= mEnabledDayStart && day <= mEnabledDayEnd;
//     }

//     private boolean isValidDayOfMonth(int day) {
//         return day >= 1 && day <= mDaysInMonth;
//     }

//     private static boolean isValidDayOfWeek(int day) {
//         return day >= Calendar.SUNDAY && day <= Calendar.SATURDAY;
//     }

//     private static boolean isValidMonth(int month) {
//         return month >= Calendar.JANUARY && month <= Calendar.DECEMBER;
//     }

//     /**
//      * Sets the first day of the week.
//      *
//      * @param weekStart which day the week should start on, valid values are
//      *                  {@link Calendar#SUNDAY} through {@link Calendar#SATURDAY}
//      */
//     public void setFirstDayOfWeek(int weekStart) {
//         if (isValidDayOfWeek(weekStart)) {
//             mWeekStart = weekStart;
//         } else {
//             mWeekStart = mCalendar.getFirstDayOfWeek();
//         }

//         // Invalidate cached accessibility information.
//         invalidate();
//     }

//     /**
//      * Sets all the parameters for displaying this week.
//      * <p/>
//      * Parameters have a default value and will only update if a new value is
//      * included, except for focus month, which will always default to no focus
//      * month if no value is passed in. The only required parameter is the week
//      * start.
//      *
//      * @param month            the month
//      * @param year             the year
//      * @param weekStart        which day the week should start on, valid values are
//      *                         {@link Calendar#SUNDAY} through {@link Calendar#SATURDAY}
//      * @param enabledDayStart  the first enabled day
//      * @param enabledDayEnd    the last enabled day
//      * @param selectedDayStart the start of the selected date range, or -1 for no selection
//      * @param selectedDayEnd   the end of the selected date range, or -1 for no selection
//      */
//     void setMonthParams(int month, int year, int weekStart, int enabledDayStart,
//                         int enabledDayEnd, int selectedDayStart, int selectedDayEnd) {
//         if (isValidMonth(month)) {
//             mMonth = month;
//         }
//         mYear = year;

//         mCalendar.set(Calendar.MONTH, mMonth);
//         mCalendar.set(Calendar.DAY_OF_MONTH, 1);
//         mDayOfWeekStart = mCalendar.get(Calendar.DAY_OF_WEEK);

//         if (isValidDayOfWeek(weekStart)) {
//             mWeekStart = weekStart;
//         } else {
//             mWeekStart = mCalendar.getFirstDayOfWeek();
//         }

//         // Figure out what day today is.
//         final Calendar today = Calendar.getInstance();
//         mToday = -1;

//         mDaysInMonth = AvailabilityUtils.getDaysInMonth(mMonth, mYear);

//         for (int i = 0; i < mDaysInMonth; i++) {
//             final int day = i + 1;
//             if (sameDay(day, today)) {
//                 mToday = day;
//             }
//         }

//         mEnabledDayStart = constrain(enabledDayStart, 1, mDaysInMonth);
//         mEnabledDayEnd = constrain(enabledDayEnd, mEnabledDayStart, mDaysInMonth);

//         mAvailabilityUtils.selectedDay = selectedDayStart;
//     }

//     private boolean sameDay(int day, Calendar today) {
//         return mYear == today.get(Calendar.YEAR) && mMonth == today.get(Calendar.MONTH)
//                 && day == today.get(Calendar.DAY_OF_MONTH);
//     }


//     private boolean isCurrentMonth() {
//         final Calendar today = Calendar.getInstance();

//         return mYear == today.get(Calendar.YEAR) && mMonth == today.get(Calendar.MONTH);
//     }

//     public void setSelectedDay(int selectedDay) {
//         mAvailabilityUtils.selectedDay = selectedDay;

//         invalidate();
//     }

//     @TargetApi(Build.VERSION_CODES.JELLY_BEAN_MR1)
//     @Override
//     protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//         final int weeksInMonth = (int) Math.ceil((mDaysInMonth + findDayOffset()) / (float) DAYS_IN_WEEK);
//         final int preferredHeight = mDesiredDayHeight * weeksInMonth
//                 + mDesiredDayOfWeekHeight + mDesiredMonthHeaderHeight
//                 + getPaddingTop() + getPaddingBottom();

//         final int preferredWidth = mDesiredCellWidth * DAYS_IN_WEEK
//                 + (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1 ? getPaddingStart() : getPaddingLeft())
//                 + (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1 ? getPaddingEnd() : getPaddingRight());
//         final int resolvedWidth = resolveSize(preferredWidth, widthMeasureSpec);
//         final int resolvedHeight = resolveSize(preferredHeight, heightMeasureSpec);

//         setMeasuredDimension(resolvedWidth, resolvedHeight);
//     }

//     @Override
//     protected void onLayout(boolean changed, int left, int top, int right, int bottom) {
//         if (!changed) {
//             return;
//         }

//         // Let's initialize a completely reasonable number of variables.
//         final int w = right - left;
//         final int h = bottom - top;
//         final int paddingLeft = getPaddingLeft();
//         final int paddingTop = getPaddingTop();
//         final int paddingRight = getPaddingRight();
//         final int paddingBottom = getPaddingBottom();
//         final int paddedRight = w - paddingRight;
//         final int paddedBottom = h - paddingBottom;
//         final int paddedWidth = paddedRight - paddingLeft;
//         final int paddedHeight = paddedBottom - paddingTop;
//         if (paddedWidth == mPaddedWidth || paddedHeight == mPaddedHeight) {
//             return;
//         }

//         mPaddedWidth = paddedWidth;
//         mPaddedHeight = paddedHeight;

//         // We may have been laid out smaller than our preferred size. If so,
//         // scale all dimensions to fit.
//         final int measuredPaddedHeight = getMeasuredHeight() - paddingTop - paddingBottom;
//         final float scaleH = paddedHeight / (float) measuredPaddedHeight;

//         mDayOfWeekHeight = (int) (mDesiredDayOfWeekHeight * scaleH);
//         mMonthHeaderHeight  = (int) (mDesiredMonthHeaderHeight * scaleH);

//         final int headerHeight = mMonthHeaderHeight + mDayOfWeekHeight;
//         final int weeksInMonth = (int) Math.ceil((mDaysInMonth + findDayOffset()) / (float) DAYS_IN_WEEK);

//         final int cellWidth = mPaddedWidth / DAYS_IN_WEEK;
//         mDayHeight = (int) (mDesiredDayHeight * scaleH);
//         mCellWidth = cellWidth;

//         final int monthHeight = /*MAX_WEEKS_IN_MONTH*/ weeksInMonth * mDayHeight;
//         mMonthHeight = (int) (monthHeight * scaleH) + headerHeight;

//         // Compute the largest day selector radius that's still within the clip
//         // bounds and desired selector radius.
//         final int maxSelectorWidth = cellWidth / 2 + Math.min(paddingLeft, paddingRight);
//         final int maxSelectorHeight = mDayHeight / 2 + paddingBottom;
//         mDaySelectorRadius = Math.min(mDesiredDaySelectorRadius,
//                 Math.min(maxSelectorWidth, maxSelectorHeight));
//         mHasBookingsRadius = Math.min(mDesiredHasBookingsRadius,
//                 Math.min(maxSelectorWidth, maxSelectorHeight));

//         // Invalidate cached accessibility information.
// //        mTouchHelper.invalidateRoot();
//     }

//     public int getMonthHeight() {
//         return mMonthHeight;
//     }

//     public int getCellWidth() {
//         return mCellWidth;
//     }

//     // Borrowed from MathUtils
//     public static int constrain(int amount, int low, int high) {
//         return amount < low ? low : (amount > high ? high : amount);
//     }

//     // Borrowed from MathUtils
//     public static long constrain(long amount, long low, long high) {
//         return amount < low ? low : (amount > high ? high : amount);
//     }

//     public void setHighlightedDays(int[] highlighted) {
//         mHighlightedDays = highlighted;

//         invalidate();
//     }

//     public void setHasBookingsDays(int[] hasBookings) {
//         mHasBookingsDays = hasBookings;

//         invalidate();
//     }

//     /**
//      * Handles callbacks when the user clicks on a time object.
//      */
//     public interface OnDayClickListener {
//         void onDayClick(MonthView view, Calendar day);
//     }

// }