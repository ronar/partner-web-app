import React, { PropsWithChildren, useState, useEffect, useCallback, FormEvent, MouseEvent } from 'react';
// import DeviceSelectionScreen from './DeviceSelectionScreen/DeviceSelectionScreen';
import { Theme } from '@material-ui/core';
import IntroContainer from '../IntroContainer/IntroContainer';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// import MediaErrorSnackbar from './MediaErrorSnackbar/MediaErrorSnackbar';
// import RoomNameScreen from './RoomNameScreen/RoomNameScreen';
import { useAppState } from '../../state';
import { Booking } from '../../types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import moment from 'moment';
// import useVideoContext from '../../hooks/useVideoContext/useVideoContext';

import UserPlaceholder from '../../icons/UserPlaceholder';
import UserIcon from '../../icons/UserIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import LocationIcon from '../../icons/LocationIcon';
import ArrowRightIcon from '../../icons/ArrowRightIcon';



export enum Steps {
  roomNameStep,
  deviceSelectionStep,
}

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
    marginBottom: 4,//'0.5em',
  },
  gutterBottomBase: {
    marginBottom: 16
  },
  gutterBottomLarge: {
    marginBottom: 24
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

  SessionHelperContainer: {
    position: 'fixed',
    bottom: 0,
    paddingBottom: 86,
  },

  profilePictureContainer: {
      // width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
      // border: `solid ${theme.palette.grey[400]}`,
      // '&.selected': {
      //   border: `solid ${theme.palette.primary.main}`,
      //   '& svg': {
      //     color: `${theme.palette.primary.main}`,
      //   },
      // },
    },

    partnerProfilePictureImage: {
      width: '163px',
      height: '163px',
      // position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      objectFit: 'cover',
      borderRadius: '10px',
      // border: `solid ${theme.palette.grey[400]}`,
      // '&:hover': {
      //   cursor: 'pointer',
      //   '& svg': {
      //     color: `${theme.palette.primary.main}`,
      //   },
      //   '& $thumbOverlay': {
      //     visibility: 'visible',
      //   },
      // },
      // '&.selected': {
      //   border: `solid ${theme.palette.primary.main}`,
      //   '& svg': {
      //     color: `${theme.palette.primary.main}`,
      //   },
      // },
    },
    whiteBasicColor: {
      color: theme.whiteBasic,
    },
    greyColor: {
      color: theme.grey,
    },

    greyMainColor: {
      color: theme.greyMain,
    },

    redColor: {
      color: theme.red,
    },

    trueblackBasicColor: {
      color: theme.trueblackBasic
    },

    hidden: {
      display: 'none'
    },

    roundedTopContainer: {
      marginTop: -8,
      paddingTop: 24,
      paddingLeft: 16,
      paddingRight: 16,
      borderTopRightRadius: 8,
      borderTopLeftRadius: 8,
      boxShadow: '0px 0px 32px rgba(0, 0, 0, 0.1)',
      backgroundColor: 'white',
      position: 'relative'
    },

    linkLikeButton: {
      textDecoration: 'underline'
    },

    bottomNavigationContainer: {
      position: 'absolute',
      bottom: 0,
    },
    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      padding: 0,
    },
    root: {
      justifyContent: 'center'
    }
}));

const MyBox = withStyles((theme) => ({
  root: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: theme.greyMain,
    // paddingTop: 10,
    // paddingBottom: 10,
  }
}))(Box);

interface SessionHelperProps {
  inProgress?: Booking[] | null;
  upcoming?: Booking[] | null;
  // inProgress: boolean;
  // open: boolean;
  // onClose(): void;
  onClick(): void;
}

export default function SessionHelper({ inProgress, upcoming, onClick }: PropsWithChildren<SessionHelperProps>) {
  const classes = useStyles();
  // const { user } = useAppState();
  const history = useHistory();
  // const { getAudioAndVideoTracks } = useVideoContext();
  // const { URLRoomName } = useParams<{ URLRoomName?: string }>();

  // const [step, setStep] = useState(Steps.deviceSelectionStep); // useState(Steps.roomNameStep);

  const [areThereInProgressSessions, setAreThereInProgressSessions] = useState<boolean>(!!(inProgress && inProgress.length));

  // const [roomName, setRoomName] = useState<string>('');

  // const [mediaError, setMediaError] = useState<Error>();

  const [selectedIndex, setSelectedIndex] = useState(1);

  const searchParams = new URLSearchParams(window.location.search);
  const bookingId = searchParams.get('bookingId');

  useEffect(() => {
    setAreThereInProgressSessions(!!(inProgress && inProgress.length));
  }, [inProgress, setAreThereInProgressSessions]);

  // useEffect(() => {
  //   if (URLRoomName) {
  //     setRoomName(URLRoomName);
  //     if (user?.displayName) {
  //       setStep(Steps.deviceSelectionStep);
  //     }
  //   }
  // }, [user, URLRoomName]);

  // useEffect(() => {
  //   if (step === Steps.deviceSelectionStep && !mediaError) {
  //     getAudioAndVideoTracks().catch(error => {
  //       console.log('Error acquiring local media:');
  //       console.dir(error);
  //       setMediaError(error);
  //     });
  //   }
  // }, [getAudioAndVideoTracks, step, mediaError]);

  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // If this app is deployed as a twilio function, don't change the URL because routing isn't supported.
  //   // @ts-ignore
  //   if (!window.location.origin.includes('twil.io') && !window.STORYBOOK_ENV) {
  //     window.history.replaceState(null, '', window.encodeURI(`/room/${roomName}${window.location.search || ''}`));
  //   }
  //   setStep(Steps.deviceSelectionStep);
  // };

  // const userId = user ? user?.id : '';

  const handleListItemClick = (event: MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
  };

  const handleClick = useCallback((e: MouseEvent<HTMLElement>) => {
  // const handleClick = (event: MouseEvent<HTMLElement>, index: number) => {
    // setAreThereInProgressSessions(!areThereInProgressSessions)
    if (inProgress && inProgress.length) {
      history.push({ pathname: `/sessions-page/${inProgress[0].id}` });
    } else if (upcoming && upcoming.length) {
      history.push({ pathname: `/sessions-page/${upcoming[0].id}` });
    }
  }, [inProgress, upcoming]);

  // const areThereInProgressSessions = inProgress && inProgress.length;
  let upcomingSession;
  let inProgressSession;

  if (inProgress && inProgress.length) {
    inProgressSession = inProgress[0];
  } else if (upcoming && upcoming.length) {
    upcomingSession = upcoming[0];
  }

  return (
    <Container maxWidth="sm" disableGutters className={classes.SessionHelperContainer}>
      <MyBox
        py={1}
        px={2}
        // onClick={onClick}
        onClick={handleClick}
        style={{
          backgroundColor: areThereInProgressSessions ? '#3BC693' : '#303740',
          userSelect: 'none',
          cursor: 'pointer'
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <UserPlaceholder />
          <div style={{ marginLeft: 20, flexGrow: 1 }}>
            <Typography variant="caption" className={areThereInProgressSessions ? classes.whiteBasicColor : classes.redColor} style={{ textTransform: 'uppercase' }}>
              {areThereInProgressSessions ? 'Session in progress' : 'NEXT SESSION'}
            </Typography>
            <Typography variant="h3" className={areThereInProgressSessions ? classes.trueblackBasicColor : classes.whiteBasicColor}>
              {upcomingSession
                ? `${upcomingSession.user?.firstName} ${upcomingSession.user?.familyName}`
                : inProgressSession && `${inProgressSession.user?.firstName} ${inProgressSession.user?.familyName}`
              }
            </Typography>

            <Typography variant="subtitle1" className={areThereInProgressSessions ? classes.trueblackBasicColor : classes.whiteBasicColor}>
              {/*Thu, 17 Sep at 10:00 AM*/}
              {upcomingSession
                ? `${moment(Number(upcomingSession.startTime)).format('ddd, DD MMM [at] HH:mm A')}`
                : inProgressSession && `${moment(Number(inProgressSession.startTime)).format('ddd, DD MMM [at] HH:mm A')}`
              }
            </Typography>

          </div>
          <Box
            display="flex"
            className={areThereInProgressSessions ? classes.whiteBasicColor : classes.redColor}
            // alignItems="center"
          >
            <ArrowRightIcon />
          </Box>
        </Box>

      </MyBox>
    </Container>
  );
}
