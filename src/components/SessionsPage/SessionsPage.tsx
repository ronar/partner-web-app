import React, { ChangeEvent, useCallback, useState, useEffect, useRef, MouseEvent } from 'react';
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

import SlidingUpPanel from 'rn-sliding-up-panel';

import SessionDetails from '../SessionDetails/SessionDetails';

import LocationIcon from '../../icons/LocationIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import PlusIcon from '../../icons/PlusIcon';
import UserPlaceholderInPerson from '../../icons/UserPlaceholderInPerson';
import UserPlaceholderOnline from '../../icons/UserPlaceholderOnline';

import BottomNavigation from '../BottomNavigation/BottomNavigation';

import SessionInPersonListItemIcon from './SessionInPersonListItemIcon';
import SessionOnlineListItemIcon from './SessionOnlineListItemIcon';

import { makeStyles } from '@material-ui/core/styles';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import moment from 'moment';

import { getViewportHeight } from '../../utils';

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: '100%'
  }
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
    marginBottom: '1em',
  },
  gutterTopDoubleMedium: {
    marginTop: '2em',
  },
  gutterBottomDoubleMedium: {
    marginBottom: '2em',
  },
  gutterBottomExtraExtraLarge: {
    marginBottom: 80
  },
  passcodeContainer: {
    minHeight: '120px',
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
  root: {
    justifyContent: 'center',
    color: theme.trueblackBasic,
    minWidth: 24
  },
  rootArrow: {
    color: theme.red,
    minWidth: 24
  }
}));

const height = getViewportHeight();

export default function SessionsPage() {
  const classes = useStyles();
  const { signIn, user, getBooking, booking, upcomingBookings, getUpcomingBookings, isAuthReady } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const { BookingId } = useParams<{ BookingId?: string }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  // const [booking, setBooking] = useState(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingStatus, setBookingStatus] = useState('HAS_A_PARTNER');
  const [sessionType, setSessionType] = useState('');
  const [authError, setAuthError] = useState<Error | null>(null);

  const isAuthEnabled = true; // Boolean(process.env.REACT_APP_SET_AUTH);

  const panelRef = useRef<SlidingUpPanel>(null);

  useEffect(() => {
    if (BookingId) {
      setBookingId(BookingId);

      getBooking(Number(BookingId));
      // if (user?.displayName) {
      //   setStep(Steps.deviceSelectionStep);
      // }
    }
  }, [user, BookingId]);

  useEffect(() => {
    getUpcomingBookings();

  }, []);

  useEffect(() => {
    if (bookingId && booking) {
       panelRef.current && panelRef.current.show();
    }
  }, [bookingId, booking]);



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

  // const handleClick = (event: MouseEventHandler<HTMLDivElement>) => {
  //  // const handleClick = (event: MouseEvent<HTMLElement>, index: number) => {

  const handleCtaClick = () => {
    if (bookingStatus === 'HAS_A_PARTNER') {

      setBookingStatus('IN_PROGRESS');
    } else {
      setBookingStatus('HAS_A_PARTNER');
    }
  };

  const handleBookingClick = useCallback((bookingId) => {
    return (e: MouseEvent<HTMLInputElement>) => {
      e.preventDefault() // we can all this directly here now!

      history.replace({ pathname: `/sessions-page/${bookingId}` });
      panelRef.current && panelRef.current.show();
    }
  }, [history]);

  const handleSessionDetailsPopupClose = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    panelRef.current && panelRef.current.hide();

    history.push({ pathname: '/sessions-page' });
  }, [history]);

  // //   e.preventDefault();
  // //   login();
  //  history.push('session-details');
  // };

  // if (user || !isAuthEnabled) {
  //   history.replace('/');
  // }

  // if (!isAuthReady) {
  //   return null;
  // }

  const getProductType = (productId: string) => {
    return productId.includes('_LS') ? 'LS' : 'F2F';
  };

  return (
    <>
    <Container>
      <Typography variant="h2" className={clsx(classes.gutterTopDoubleMedium, classes.gutterBottomDoubleMedium, classes.greyMainColor)}>
        Upcoming sessions
      </Typography>
    </Container>
    <RoundedContainer>

    {/*<Typography variant="h3" className={clsx( classes.gutterBottom, classes.greyColor)}>
        4 postcodes covered:
    </Typography>*/}

      <Container maxWidth="sm" disableGutters>
        <List component="nav" aria-label="mailbox folders" disablePadding className={classes.gutterBottomExtraExtraLarge}>
          {upcomingBookings!.map(booking => (
            <>
            <ListItem
              button
              style={{ paddingLeft: 0, paddingRight: 0 }}
              onClick={handleBookingClick(booking.id)}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                flex="1"
              >
                {getProductType(booking.product.id) === 'LS'
                  ? <SessionOnlineListItemIcon />
                  : <SessionInPersonListItemIcon />
                }
                <ListItemText
                  primaryTypographyProps={{
                    variant: "h3",
                    // display: "inline",
                    // color: "primary"
                    style: {color: '#111418'}
                  }}
                  secondaryTypographyProps={{
                    variant: "body1",
                    // display: "inline",
                    // color: "primary",
                    style: {color: '#111418'}
                  }}
                  primary={`${booking.user?.firstName} ${booking.user?.familyName}`}
                  secondary={moment(Number(booking.startTime)).format('ddd, DD MMM [at] HH:mm A')}
                  // secondary="Thu, 12 Aug at 14:00"
                  style={{ marginLeft: 16 }}
                />
                <ListItemIcon
                  classes={{
                    root: classes.rootArrow,
                  }}
                >
                  <ArrowRightIcon />
                </ListItemIcon>
              </Box>
            </ListItem>
            <Divider />
            </>
          ))}
          <Divider light />
        </List>
      </Container>

      {/*<Grid container justifyContent="flex-end">
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // disabled={!password.length}
          className={classes.addAreaCtaButton}
        >
          <PlusIcon />
          Add Area
        </Button>
      </Grid>*/}


      {/*<form onSubmit={handleSubmit}>
        <Grid container justifyContent="space-between">
          <div className={classes.passcodeContainer}>
            <InputLabel shrink htmlFor="input-passcode">
              Email
            </InputLabel>
            <TextField
              id="input-email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="text"
              variant="outlined"
              size="small"
            />
            <InputLabel shrink htmlFor="input-passcode">
              Password
            </InputLabel>
            <TextField
              id="input-passcode"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              size="small"
            />
            <div>
              {authError && (
                <Typography variant="caption" className={classes.errorMessage}>
                  <ErrorOutlineIcon />
                  {authError.message}
                </Typography>
              )}
            </div>
          </div>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={!password.length}
            className={classes.submitButton}
          >
            Submit
          </Button>
        </Grid>
      </form>*/}

    </RoundedContainer>
    <BottomNavigation />

    <SlidingUpPanel
      ref={panelRef}
      // draggableRange={{ top: booking && booking?.product?.id?.includes('_LS') ? 1165 : 1330, bottom: 0 }}
      draggableRange={{ top: height - 24/*780*/, bottom: 0 }}
      snappingPoints={[ 118, 660 ]}
      // // onDragStart={ (position) => { this.setState({ isDragged: true }); } }
      // // onDragEnd={ (position) => { this.setState({ isDragged: false }); } }
      // onBottomReached={handleBottomReached}
      // onFullyOpen={ () => setIsFullyOpen(true) }
      // //snappingPoints={[panelExpandedY]}
      backdropStyle={panelStyles.backdrop}
      containerStyle={panelStyles.container}
      // height={booking && booking?.product?.id?.includes('_LS') ? 1165 : 1330}
      height={height - 24 /*807*/}
    >
      {bookingId && booking ? (
      <div style={styles.container}>
        <SessionDetails
          booking={booking}
          status={bookingStatus}
          sessionType={sessionType}
          onClick={handleCtaClick}
          onClose={handleSessionDetailsPopupClose}
        />
      </div> ): <div />
      }
    </SlidingUpPanel>
    </>
  );
}
