import React, { PropsWithChildren, ChangeEvent, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { useAppState } from '../../state';

import Button from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { ReactComponent as GoogleLogo } from './google-logo.svg';
import { InputLabel, Theme } from '@material-ui/core';
import IntroContainer from '../IntroContainer/IntroContainer';
import RoundedContainer from '../RoundedContainer/RoundedContainer';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import UserPlaceholder from '../../icons/UserPlaceholder';
import LocationIcon from '../../icons/LocationIcon';
import CloseIcon from '../../icons/Close2Icon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import PlusIcon from '../../icons/PlusIcon';
import UserPlaceholderInPerson from '../../icons/UserPlaceholderInPerson';
import UserPlaceholderOnline from '../../icons/UserPlaceholderOnline';
import PhoneIcon from '../../icons/PhoneIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import QuestionOIcon from '../../icons/QuestionOIcon';
import Calendar64Icon from '../../icons/Calendar64Icon';
import Location64Icon from '../../icons/Location64Icon';
import SessionOnline64Icon from '../../icons/SessionOnline64Icon';
import WoKickboxingIcon from '../../icons/WoKickboxingIcon';
import CopyIcon from '../../icons/CopyIcon';
import FullStarIcon from '../../icons/FullStarIcon';

import BottomNavigation from '../BottomNavigation/BottomNavigation';

// import SessionInPersonListItemIcon from './SessionInPersonListItemIcon';
// import SessionOnlineListItemIcon from './SessionOnlineListItemIcon';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) => ({
  googleButton: {
    background: 'white',
    color: 'rgb(0, 94, 166)',
    borderRadius: '4px',
    border: '2px solid rgb(2, 122, 197)',
    margin: '1.8em 0 0.7em',
    textTransform: 'none',
    boxShadow: 'none',
    padding: '0.3em 1em',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    '&:hover': {
      background: 'white',
      boxShadow: 'none',
    },
  },
  errorMessage: {
    color: 'red',
    display: 'flex',
    alignItems: 'center',
    margin: '1em 0 0.2em',
    '& svg': {
      marginRight: '0.4em',
    },
  },
  gutterBottom: {
    marginBottom: '.5rem',
  },
  gutterBottomBase: {
    marginBottom: '1rem',
  },
  gutterBottomExtraLarge: {
    marginBottom: '1.5em',
  },
  gutterTopDoubleMedium: {
    marginTop: '2em',
  },
  gutterBottomDoubleMedium: {
    marginBottom: '2em',
  },
  gutterTopFull: {
    marginTop: 64
  },
  gutterBottomExtraExtraLarge: {
    marginBottom: 80
  },
  passcodeContainer: {
    minHeight: '120px',
  },
  bottomCtaContainer: {
    position: 'fixed',
    bottom: 100,
    left: 0,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.1)',
    zIndex: 1099
  },
  submitButton: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  addAreaCtaButton: {
    marginBottom: 8,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  whiteBasicColor: {
    color: theme.whiteBasic,
  },
  trueblackBasicColor: {
    color: theme.trueblackBasic,
  },
  redColor: {
    color: theme.red,
  },
  greyColor: {
    color: theme.grey,
  },
  greyMainColor: {
    color: theme.greyMain,
  },
  greenMainColor: {
    color: theme.greenMain,
  },
  root: {
    justifyContent: 'center',
    color: theme.trueblackBasic,
    minWidth: 24
  },
  rootArrow: {
    color: theme.red,
    minWidth: 24
  },
  closeBackgroundSelection: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },

  linkLikeButton: {
    textDecoration: 'underline'
  },
}));

// TODO: make component
const GreyRoundedBox = withStyles((theme) => ({
  root: {
    height: "100%",
    // borderTopLeftRadius: 8,
    // borderTopRightRadius: 8,
    borderRadius: 8,
    backgroundColor: theme.greyLight,
    // paddingTop: 10,
    // paddingBottom: 10,
  }
}))(Box);

// Fixed number of columns
const gridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)"
};

// Variable number of columns
const gridContainer2 = {
  display: "grid",
  gridAutoColumns: "1fr",
  gridAutoFlow: "column"
};

const gridItem = {
  height: "100%",
  // margin: "8px",
  // border: "1px solid red"
};

interface StarsRatingBlockProps {
  // open: boolean;
  title: string;
  className?: string;
  trainerName?: string;
  rating?: number;
  // sessionType: string;
  // onClick(): void;
  // onClose(): void;
  onRatingSet(rating: number): void;
}

export default function StarsRatingBlock({ className, title, trainerName, rating = 0, onRatingSet }: PropsWithChildren<StarsRatingBlockProps>) {
  const classes = useStyles();
  const { signIn, user, isAuthReady } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [hoveredStar, setHoveredStar] = useState<number>(0);
  const [userRating, setUserRating] = useState<number>(0);
  const [authError, setAuthError] = useState<Error | null>(null);

  const isAuthEnabled = true; // Boolean(process.env.REACT_APP_SET_AUTH);

  var ratingStars = [],
    starClass,
    starStyle;

  const handleMouseEnter = (star: number) => {
    // If we already got the user rating from the server
    // or set recently
    if (rating !== 0) {
      return;
    }

    // this.tooltipTimeout && clearTimeout(this.tooltipTimeout);
    // newState.isTooltipShow = false;

    setHoveredStar(star);
    // this.showTooltip()
    //     .then(() => {
    //         this.setState({ isTooltipShow: true });
    //     });
  };

  const handleClick = (userRating: number) => {
    if (userRating !== 0) {
      // newState = Object.assign(newState, { userRating });
      setUserRating(userRating);
      onRatingSet(userRating);
    }

    setHoveredStar(0);

    // this.setState(newState);

    // this.showComments()
    //   .then(() => {
    //       this.setState({ isCommentsShow: true });
    //   });
  };

  // const login = () => {
  //   setAuthError(null);
  //   signIn?.(email, password)
  //     .then(() => {
  //       history.replace(location?.state?.from || { pathname: '/', search: window.location.search });
  //     })
  //     .catch(err => {
  //       setAuthError(err);
  //       console.log(err);
  //     });
  // };

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   login();
  // };

  // if (user || !isAuthEnabled) {
  //   history.replace('/');
  // }

  // if (!isAuthReady) {
  //   return null;
  // }


  if (rating !== 0) {
    for (let i = 0; i < 5; i++) {
        ratingStars.push(
          <Box display="flex" style={{ color: i < rating ? '#E94E32' : '#CBCFD5' }} key={i}>
            <i
              // className={starClass}
              onMouseEnter={() => handleMouseEnter(i + 1)}
              onClick={() => handleClick(i + 1)}
            >
              <FullStarIcon />
            </i>
          </Box>
        );
    }
  } else {
    for (let i = 0; i < 5; i++) {
      if (userRating !== 0) {
        starStyle = { color: i < userRating ? '#E94E32' : '#CBCFD5' };
        // starClass = `icon icon-star${i < (userRating) ? ' full' : ''}`;
      } else {
        starStyle = { color: i < hoveredStar ? '#F1644A' : '#CBCFD5' };
        // starClass = `icon icon-star${i < (hoveredStar) ? ' hover' : ''}`;
      }

        {/*<div className='star-wrapper' key={i}>*/}
      ratingStars.push(
        <Box display="flex" style={starStyle} key={i}>
          <i
            // className={starClass}
            onMouseEnter={() => handleMouseEnter(i + 1)}
            onClick={() => handleClick(i + 1)}
          >
            <FullStarIcon />
          </i>
        </Box>
      );
      {/*i + 1 == this.state.hoveredStar ? <Tooltip style={'star-tooltip'} isShow={this.state.isTooltipShow}>Rate {i + 1} star{i > 0 ? 's' : ''}</Tooltip>: null*/}
      // </div>
    }
  }

  return (
    <div className={clsx(className, 'stars-rating-block')} onMouseLeave={() => setHoveredStar(0)}>

      <Typography variant="subtitle2" className={clsx(classes.gutterBottom, classes.greyColor)} >
        {title}
      </Typography>

      <Box
        display="flex"
        justifyContent="center"
        mb={2}
      >
        {ratingStars}
      </Box>
    </div>
  );
}