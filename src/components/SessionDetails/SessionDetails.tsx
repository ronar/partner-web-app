import React, { PropsWithChildren, ChangeEvent, MouseEvent, useState, useEffect, useCallback, FormEvent } from 'react';
import { Booking } from '../../types';
import clsx from 'clsx';
import moment from 'moment';
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

import BottomNavigation from '../BottomNavigation/BottomNavigation';

import RateSessionDialog from '../RateSessionDialog/RateSessionDialog';

// import SessionInPersonListItemIcon from './SessionInPersonListItemIcon';
// import SessionOnlineListItemIcon from './SessionOnlineListItemIcon';

import { copy } from '../../utils';
// import { copy } from '../../../utils';
import { CALENDAR_FORMATS } from '../../constants';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useLocation, useHistory } from 'react-router-dom';

import Address from '../../helpers/Address';

import sessionDetailsMapImg from './session-details-map@2x.png';


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
    bottom: 0, // 100,
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
  closeSessionDetails: {
    cursor: 'pointer',
    display: 'flex',
    background: 'transparent',
    border: '0',
    padding: '0',
  },

  buttonsDuet: {
    cursor: 'pointer',
    display: 'flex',
    width: '100%',
    // background: 'transparent',
    border: '0',
    // padding: '0',
    backgroundColor: '#ffffff',
    padding: '8px 16px',
    borderRadius: 8
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

interface SessionDetailsProps {
  // open: boolean;
  booking: Booking;
  status: string;
  sessionType: string;
  onClick(): void;
  onClose(e: MouseEvent<HTMLButtonElement>): void;
}

export default function SessionDetails({ booking, sessionType, onClick, onClose }: PropsWithChildren<SessionDetailsProps>) {
  const classes = useStyles();
  const {
    signIn,
    user,
    runningLate,
    startSession,
    stopSession,
    declineSession,
    cancelSession,
    isAuthReady
  } = useAppState();
  const history = useHistory();
  const location = useLocation<{ from: Location }>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [rateSessionOpen, setRateSessionOpen] = useState(false);
  const [address, setAddress] = useState('');
  const [authError, setAuthError] = useState<Error | null>(null);

  const isAuthEnabled = true; // Boolean(process.env.REACT_APP_SET_AUTH);

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

  useEffect(() => {

    if (booking && !booking.isOnline) {
      let address = new Address(booking?.location);

      setAddress(address.fullAddress(true));

      // const setEnabled = () => setIsEnabled(true);
      // const setDisabled = () => setIsEnabled(false);
      // publication.on('trackEnabled', setEnabled);
      // publication.on('trackDisabled', setDisabled);
      // return () => {
      //   publication.off('trackEnabled', setEnabled);
      //   publication.off('trackDisabled', setDisabled);
      // };
    }
  }, [booking]);


  const handleLocationCopyClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (copy(booking?.roomUrl)) {

    }
  }, [booking]);

  const handleLocationOpenClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const isOnline = booking?.product.id.includes('_LS');

    if (isOnline) {

    }

  }, [booking]);

  const handleRunningLateClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (user && booking) {
      runningLate(user?.id!, booking?.id!);
    }
  }, [user, booking]);

  const handleStartStopCtaClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (user && booking) {
      // booking.status === 'IN_PROGRESS' .status === 'IN_PROGRESS' ? 'Stop Session' : 'Start Session'}

      if (booking?.status === 'IN_PROGRESS') {
        stopSession(user?.id!, booking?.id!)
          .then(() => {
            history.push({ pathname: '/rate-session' });
          });
      } else {
        startSession(user?.id!, booking?.id!);
      }
    }
  }, [user, booking]);

  // const handleStopSessionClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
  //   if (user && booking) {
  //     stopSession(user?.id!, booking?.id!);
  //   }
  // }, [user, booking]);

  const handleDeclineSessionClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (user && booking) {
      declineSession(user?.id!, booking?.id!);
    }
  }, [user, booking]);

  const handleCancelSessionClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (user && booking) {
      cancelSession(user?.id!, booking?.id!);
    }
  }, [user, booking]);

  // if (user || !isAuthEnabled) {
  //   history.replace('/');
  // }

  // if (!isAuthReady) {
  //   return null;
  // }

  // const getProductType = (productId: string) => {
  //   return productId.includes('_LS') ? 'LS' : 'F2F';
  // };

  const isOnline = booking?.product.id.includes('_LS');

  const date = booking ? moment(booking?.startTime) : moment();

  const cancelledByCustomer = booking?.status.toLowerCase().startsWith("cancelled");

  const mainCtaBackgroundColor = booking?.status === 'IN_PROGRESS' ? '#303740' : '#E94E32';

  return (
    <>
    {/*<Container>
      <Typography variant="h2" className={clsx(classes.gutterTopDoubleMedium, classes.gutterBottomDoubleMedium, classes.greyMainColor)}>
        Upcoming sessions
      </Typography>
    </Container>*/}
    <Box
      display="flex"
      textAlign="center"
      py={1}
      px={2}
      style={{
        userSelect: 'none'
      }}
      // justifyContent="space-between"
    >
      <Box
        position="absolute"
      >
        <button className={classes.closeSessionDetails} onClick={onClose}>
          <CloseIcon />
        </button>
      </Box>
      <Typography variant="button" color="primary" className={clsx( classes.gutterBottom )} style={{ flexGrow: 1 }}>
          Sessions Details
      </Typography>
    </Box>

    <RoundedContainer
      style={{ height: 'calc(100% - 50px)' }}
      innerContainerStyle={{ maxHeight: 'calc(100% + 8px)', paddingBottom: 24, overflow: 'scroll' }}
    >

      <div
        style={{
          paddingBottom: booking?.status === 'IN_PROGRESS' ? 128 : 112
        }}
      >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}

      >
        <UserPlaceholder />
        <Box
          flexGrow="1"
          ml={1}
        >
          <Box
            display="flex"
            alignItems="center"
            // justifyContent="space-between"
            mb={1}
          >
            <Box
              display="flex"
              className={clsx(classes.greyColor)}
              mr={1}
            >
              <WoKickboxingIcon />
            </Box>

            <Typography variant="caption" color="primary">
                {booking?.product.labels.displayName} session with
            </Typography>
          </Box>

          <Typography variant="h2" color="primary" className={""} >
            {/*{booking?.user?.firstName} {booking?.user?.familyName}*/}
            {booking?.customer
              ? `${booking?.customer?.firstName} ${booking?.customer?.familyName}`
              : `${booking?.user?.firstName} ${booking?.user?.familyName}`
            }
          </Typography>

          {/*<Typography variant="body1" className={classes.greyColor} >
              32, male
          </Typography>*/}

        </Box>
      </Box>



      <GreyRoundedBox
        display="flex"
        py={1}
        mb={2}
      >
        <PhoneIcon />
        <Box
          ml={2}
        >
          <Typography variant="caption" color="primary">
              Mobile:
          </Typography>
          <Typography variant="h5" color="primary">
              {booking?.user?.userDetail?.phoneNumber || '+44(0) 745 978 3573'}
          </Typography>

        </Box>
      </GreyRoundedBox>


      <Box
        sx={gridContainer}
        mb={2}
        // container spacing={2}
        // sx={{

        //   display: "flex"
        // }}
        // className={clsx(classes.greyColor)}
        // mr={1}
      >

        <Box sx={gridItem}>
          <GreyRoundedBox
            display="flex"
            alignItems="center"
            flexDirection="column"
            py={2}
            px={5}
            mr={1}
          >
            <Box
              className={classes.greenMainColor}
              // style={{  }}
            >
              <Calendar64Icon />
            </Box>
            <Typography variant="h4" color="primary">
              {date.calendar(undefined, CALENDAR_FORMATS)}
            </Typography>
            <Typography variant="h2" color="primary">
              {date.format('HH:mm')}
            </Typography>
          </GreyRoundedBox>
        </Box>

        <Box sx={gridItem}>
          <GreyRoundedBox
            display="flex"
            alignItems="center"
            flexDirection="column"
            py={2}
            px={5}
          >
            <Box
              className={classes.redColor}
              // style={{  }}
            >
              {isOnline ? <SessionOnline64Icon /> : <Location64Icon />}
            </Box>
            <Typography variant="h4" color="primary" style={{ whiteSpace: 'nowrap' }}>
              {isOnline ? 'Online' : 'In-person'}
            </Typography>
            <Typography variant="h4" color="primary">
              session
            </Typography>
          </GreyRoundedBox>
        </Box>

      </Box>


      <GreyRoundedBox
        // display="flex"
        py={1}
        mb={3}
      >
        {isOnline ?
          <Box
            pt={0}
            pb={0}
            px={2}
            flexGrow={1}
            display="flex"
            flexDirection="column"
            sx={{
              padding: '0 16px 0 16px'
            }}
          >
            <InputLabel shrink htmlFor="input-live-stream-link">
              Link for stream
            </InputLabel>
            <TextField
              id="input-live-stream-link"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              type="text"
              value={booking?.roomUrl}
              variant="outlined"
              size="small"
              style={{
                flexGrow: 1
              }}
            />
          </Box>
        :
          <img src={sessionDetailsMapImg} width="343pxh" height="154px"  />
        }

        <Box
          p={2}
        >

          {!isOnline && (
            <Box>
              <Typography variant="subtitle1" color="primary" style={{ marginBottom: 8 }}>
                Address:
              </Typography>
              <Typography variant="body1" color="primary" style={{ marginBottom: 16 }}>
                {address}
              </Typography>
            </Box>
          )}

          <Box
            display="flex"
            justifyContent="space-evenly"
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
            onClick={handleLocationCopyClick}
          >
            <Button className={classes.buttonsDuet}>
              <Typography variant="body1" color="primary">
                Copy
              </Typography>

              <Box
                display="flex"
                className={classes.redColor}
              >
                <CopyIcon />
              </Box>
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
            onClick={handleLocationOpenClick}
          >
            {isOnline ?
              <Button href={booking?.roomUrl} className={classes.buttonsDuet}>
                <Typography variant="body1" color="primary">Open</Typography>
              </Button> :
              <Button className={classes.buttonsDuet} onClick={handleLocationOpenClick}>
                <Typography variant="body1" color="primary">Open in Maps</Typography>
              </Button>
            }
          </Box>
          </Box>

        </Box>




      </GreyRoundedBox>


      <Container maxWidth="sm" disableGutters className={classes.gutterBottom}>
        <List component="nav" aria-label="mailbox folders" className={classes.gutterBottomBase}>
          <ListItem button divider style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <CalendarIcon />
              <ListItemText primary="Add to calendar" style={{ marginLeft: 16 }} />
              <Box display="flex" className={classes.redColor}>
                <ArrowRightIcon />
              </Box>
            </Box>
          </ListItem>
          <ListItem button style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              flex="1"
            >
              <QuestionOIcon />
              <ListItemText primary="Contact Support" style={{ marginLeft: 16 }} />
              <Box display="flex" className={classes.redColor}>
                <ArrowRightIcon />
              </Box>
            </Box>
          </ListItem>
          <Divider light />
        </List>
        </Container>


        {booking?.preferences.notes && (
          <>
          <Typography variant="h3" className={classes.gutterBottom} style={{ color: '#6B7178' }}>
              Client’s notes
          </Typography>

          <Typography variant="body1" color="primary" className={classes.gutterBottomExtraLarge}>
              {booking?.preferences.notes}
          </Typography>

          <Divider />
          </>
        )}

        {booking?.status === 'HAS_A_PARTNER' && (
          <Typography
            variant="subtitle1"
            color="primary"
            className={clsx(classes.gutterTopFull, classes.gutterBottomExtraLarge, classes.linkLikeButton, classes.greyColor)}
            style={{
              textAlign: 'center',
            }}
          >
              Need to decline the session?
          </Typography>
        )}

        {booking?.status === 'HAS_A_PARTNER' && (
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            // disabled={!password.length}
            className={clsx(classes.submitButton, classes.gutterBottom)}
            style={{
              // backgroundColor: status === 'IN_PROGRESS' ? '#303740' : '#E94E32'
            }}
            onClick={handleRunningLateClick}
          >
            Running late?
          </Button>
        )}
      </div>


{/* Medium Grey */}

{/*color: #6B7178;*/}



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

      {(cancelledByCustomer || booking?.status === 'HAS_A_PARTNER' || booking?.status === 'IN_PROGRESS') && (
        <Container maxWidth="xs" className={classes.bottomCtaContainer} disableGutters >
          <Box
            pt={booking?.status === 'IN_PROGRESS' ? 1 : 2}
            pb={2}
            px={2}
            sx={{
              padding: "16px"
            }}
            textAlign="center"
            // position='fixed'
            style={{
              backgroundColor: booking?.status === 'IN_PROGRESS' ? '#3BC693' : '#ffffff'
            }}
          >
            <Grid
              container
              justifyContent="center"

              // justifyContent="flex-end"
            >
              {booking?.status === 'IN_PROGRESS' && (
                <Typography variant="caption" color="secondary" className={clsx( classes.gutterBottom )} style={{ flexGrow: 1, textTransform: 'uppercase' }}>
                  Session started
                </Typography>
              )}
              {(booking?.status === 'HAS_A_PARTNER' || booking?.status === 'IN_PROGRESS') && (
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={cancelledByCustomer}
                  className={classes.submitButton}
                  style={{
                    backgroundColor: !cancelledByCustomer ? mainCtaBackgroundColor : ''
                  }}
                  onClick={handleStartStopCtaClick}
                >
                  {cancelledByCustomer ? 'Cancelled' : (booking?.status === 'IN_PROGRESS' ? 'Stop Session' : 'Start Session')}
                </Button>
              )}
            </Grid>
          </Box>
        </Container>
      )}
    </RoundedContainer>
    {/*<BottomNavigation />*/}
    <RateSessionDialog
      open={rateSessionOpen}
      onClose={() => {
        setRateSessionOpen(false);
        // setMenuOpen(false);
      }}
    />
    </>
  );

  // if (bd.cancelledByCustomer()) {
  //           ((View) customerCancelledButton.getParent()).setVisibility(View.VISIBLE);
  //       } else if (bd.sessionHasStarted() && !bd.sessionHasStopped()) {
  //           ((View) stopSessionButton.getParent()).setVisibility(View.VISIBLE);
  //       } else if (!bd.sessionHasStarted()) {
  //           ((View) startSessionButton.getParent()).setVisibility(View.VISIBLE);
  //       }



}
