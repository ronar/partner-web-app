//<LinearLayout
//     xmlns:android="http://schemas.android.com/apk/res/android"
//     android:id="@+id/rel1"
//     android:layout_width="match_parent"
//     android:layout_height="wrap_content"
//     android:gravity="top|center_horizontal"
//     android:orientation="vertical"
//     android:background="#fcfcfc"
//     android:paddingLeft="20dp"
//     android:paddingTop="40dp"
//     android:paddingRight="20dp"
//     android:paddingBottom="20dp">

//     <TextView
//         android:id="@+id/textViewAvailabilityTitle"
//         android:layout_width="wrap_content"
//         android:layout_height="wrap_content"
//         android:layout_alignParentBottom="true"
//         android:layout_centerHorizontal="false"
//         android:layout_centerVertical="true"
//         android:layout_gravity="left"
//         android:layout_marginBottom="5dp"
//         android:text="Availability"
//         android:textAppearance="@style/AvailabilityActivityHeaderTitle" />

//     <TextView
//         android:id="@+id/textViewAvailabilitySubTitle"
//         android:layout_width="wrap_content"
//         android:layout_height="wrap_content"
//         android:layout_gravity="left"
//         android:layout_marginBottom="10dp"
//         android:text="Set your available time and dates"
//         android:textColor="#808080"
//         android:textAppearance="@style/FontMuseo.Black.Small" />

// </LinearLayout>

/**
 *
 *  Header
 *  AvailabilityPicker
 *
 *  Created by Vladimir Shislyannikov on 24/09/2022.
 *  Copyright (c) 2022 iWoo Ltd. All rights reserved.
 *
 */

import React from 'react';
// const createReactClass = require('create-react-class');
import PropTypes from 'prop-types'; // use directly
import clsx from 'clsx';

import Typography from '@material-ui/core/Typography';

// const Button = ('./Button');
import { makeStyles, Theme } from '@material-ui/core/styles';



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
  fontWeight: 700,
  fontSize: '12px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#6b7178',
  // .rw-cell, .rw-head-cell {
  // text-align: center;
  padding: 0,
  border: 0,
  paddingBottom: '10px',
  // }
  },
  apCalendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '24px',
    marginBottom: '24px',
    paddingLeft: '16px',
    paddingRight: '16px',
    alignItems: 'center',
  },
  apCalendarHeaderText: {

  },
  apCalendarBtnView: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '26px',
    letterSpacing: 'normal',
    fontFamily: '"Poppins",sansSerif',
    // textTransform: 'none',
    display: 'flex',
    justifyContent: 'center',
    // width: 'auto',
    flexGrow: 1,
    alignSelf: 'center',
    color: theme.blackGrey, // '#111418',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  greyColor: {
    color: theme.grey,
  },
  greyMainColor: {
    color: theme.greyMain,
  },
}));



export default function Header(props: {
  messages?: string[];
  label?: string;
  nextLabel?: string;
  prevLabel?: string;
  daysCountLabel?: string;
  hoursCountLabel?: string;
  labelId?: string;
  onMoveRight?: () => void;
  onMoveLeft?: () => void;
  onViewChange?: () => void;
  prevDisabled?: boolean;
  upDisabled?: boolean;
  nextDisabled?: boolean;
  isRtl?: boolean;
}) {
  const {
    messages,
    label,
    daysCountLabel,
    hoursCountLabel,
    nextLabel,
    prevLabel,
    labelId,
    onMoveRight,
    onMoveLeft,
    onViewChange,
    prevDisabled,
    upDisabled,
    nextDisabled,
    isRtl,
  } = props;

  const classes = useStyles();

  return (
    <div className={clsx('ap-calendar-header', classes.apCalendarHeader)}>
      <div className='ap-calendar-btns'>
        {/*<button
          type='button'
          className='ap-btn ap-calendar-btn ap-calendar-btn-left'
          onClick={onMoveLeft}
          // disabled={prevDisabled}
        >

          <svg width='8' height='13' viewBox='0 0 8 13' xmlns='http://www.w3.org/2000/svg' className='tb-icon'>
            <path fillRule='evenodd' d='M8 11.5L6.5 13L5.68248e-07 6.5L6.5 -1.31134e-07L8 1.5L3 6.5L8 11.5Z' />
          </svg>
        </button>*/}
        <span
          id={labelId}
          onClick={onViewChange}
          className={clsx('ap-calendar-btn-view', classes.apCalendarBtnView)}
          // disabled={upDisabled}
          aria-live='polite'
          aria-atomic='true'
        >
          <span>{label}</span>
        </span>
        {/*<button
          type='button'
          className='ap-btn ap-calendar-btn ap-calendar-btn-right'
          onClick={onMoveRight}
          disabled={nextDisabled}
          // label={messages.moveForward()}
        >
          <svg width='8' height='13' viewBox='0 0 8 13' xmlns='http://www.w3.org/2000/svg' className='tb-icon'>
            <path fillRule='evenodd' d='M0 1.5L1.5 0L8 6.5L1.5 13L0 11.5L5 6.5L0 1.5Z' />
          </svg>
        </button>*/}
      </div>
      <div className={clsx('ap-calendar-header-text', classes.apCalendarHeaderText, classes.greyMainColor)}>
        <Typography variant="subtitle1" className={clsx(classes.greyColor)} >{daysCountLabel} DAYS / {hoursCountLabel} HOURS</Typography>
      </div>
    </div>
  );
}
